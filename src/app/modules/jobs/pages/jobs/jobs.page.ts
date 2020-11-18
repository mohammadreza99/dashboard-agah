import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { JobService } from '@core/http/job/job.service';
import { Router } from '@angular/router';
import { JobItem, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<JobItem[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private jobService: JobService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.jobService.get();
  }

  addJobItem() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((job: JobItem) => {
        if (job) {
          this.jobService.post(job).subscribe((res) => {
            this.table.addTransaction(job);
            this.dataService.successfullMessage(this.vcRef);
            this.getRowData();
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
        type: 'textarea',
        label: 'توضیحات',
        labelWidth: 110,
        formControlName: 'description',
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

  onCellValueChanged(event) {
    const job = new JobItem();
    job.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      job[field] = value;
    }
    this.jobService.patch(job).subscribe(() => {
      this.table.updateTransaction(job);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const job = new JobItem();
    job.id = e.rowData.id;
    job[e.field] = e.file;
    this.jobService.patch(job).subscribe(() => {
      this.table.updateTransaction(job);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as JobItem;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.jobService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'add-details':
        this.router.navigate(['/dashboard/jobs/details', rowData.id]);
        break;
    }
  }
}
