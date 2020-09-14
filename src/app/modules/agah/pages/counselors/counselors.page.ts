import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CounselorService } from '@app/core/http/counselor/counselor.service';
import { DataService } from '@app/core/services/data.service';
import { Observable } from 'rxjs';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Counselor } from '@app/shared/models/counselor.model';
import { ColDef } from 'ag-grid-community';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-counselors',
  templateUrl: './counselors.page.html',
  styleUrls: ['./counselors.page.scss'],
})
export class CounselorsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Counselor[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'first_name',
      headerName: 'نام',
    },
    {
      field: 'last_name',
      headerName: 'نام خانوادگی',
    },
    {
      field: 'position',
      headerName: 'سمت',
    },
  ];

  constructor(
    private counselorService: CounselorService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.counselorService.get();
  }

  addCounselor() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((counselor: Counselor) => {
        if (counselor) {
          this.counselorService.post(counselor).subscribe((res) => {
            this.table.addTransaction(counselor);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'نام',
        labelWidth: 110,
        formControlName: 'first_name',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'نام خانوادگی',
        labelWidth: 110,
        formControlName: 'last_name',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'سمت',
        labelWidth: 110,
        formControlName: 'position',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 110,
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const counselor = new Counselor();
    counselor.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      counselor[field] = value;
    }
    this.counselorService.patch(counselor).subscribe(() => {
      this.table.updateTransaction(counselor);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const counselor = new Counselor();
    counselor.id = e.rowData.id;
    counselor[e.field] = e.file;
    this.counselorService.patch(counselor).subscribe(() => {
      this.table.updateTransaction(counselor);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Counselor;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.counselorService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
