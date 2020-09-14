import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { ActivatedRoute, Route } from '@angular/router';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { JobItemDetails, JobItem } from '@app/shared/models/job.model';
import { JobService } from '@app/core/http/job/job.service';

@Component({
  selector: 'ag-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<JobItemDetails[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
    },
  ];
  job: JobItem;
  pageTitle: string;

  constructor(
    private jobService: JobService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.job = await this.jobService.getById(id).toPromise();
    this.rowData$ = this.jobService.getDetails(id);
    this.pageTitle = `افزودن جزییات شغل - ${this.job.title}`;
  }

  addJobItemDetails() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1200px')
      .onClose.subscribe((jobItemDetails: JobItemDetails) => {
        if (jobItemDetails) {
          this.jobService
            .postDetails(this.job.id, jobItemDetails)
            .subscribe((res) => {
              this.table.addTransaction(jobItemDetails);
              this.dataService.successfullMessage(this.vcRef);
            });
        }
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 110,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'tags',
        label: 'جزییات',
        field: '',
        labelWidth: 110,
        formControlName: 'details',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 110,
        formControlName: 'logo',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  editFormConfig(value: string[]): DialogFormConfig[] {
    return [
      {
        type: 'tags',
        label: 'جزییات',
        field: '',
        labelWidth: 110,
        formControlName: 'details',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onCellValueChanged(event) {
    const jobDetails = new JobItemDetails();
    jobDetails.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      jobDetails[field] = value;
    }
    this.jobService.patchDetails(this.job.id, jobDetails).subscribe(() => {
      this.table.updateTransaction(jobDetails);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const jobDetails = new JobItemDetails();
    jobDetails.id = e.rowData.id;
    jobDetails[e.field] = e.file;
    this.jobService.patchDetails(this.job.id, jobDetails).subscribe(() => {
      this.table.updateTransaction(jobDetails);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as JobItemDetails;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.jobService
            .deleteDetails(this.job.id, rowData.id)
            .subscribe(() => {
              this.table.deleteTransaction(rowData);
              this.dataService.successfullMessage(this.vcRef);
            });
        });
        break;
      case 'edit-details':
        this.dialogFormService.show(
          'ویرایش جزئیات',
          this.editFormConfig(rowData.details),
          '1200px'
        );
        break;
    }
  }
}
