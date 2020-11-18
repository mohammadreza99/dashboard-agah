import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';

import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';
import { ProcessService } from '@core/http/process/process.service';
import { TableComponent } from '@shared/components/table/table.component';
import { DialogFormService } from '@core/services/dialog-form.service';
import { ColDef } from 'ag-grid-community';
import { Process, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Process[]>;
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
      headerName: 'عنوان',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private processService: ProcessService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.processService.get();
  }

  addProcess() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((process: Process) => {
        if (process) {
          this.processService.post(process).subscribe((res) => {
            this.table.addTransaction(process);
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
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const process = new Process();
    process.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      process[field] = value;
    }
    this.processService.patch(process).subscribe(() => {
      this.table.updateTransaction(process);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const process = new Process();
    process.id = e.rowData.id;
    process[e.field] = e.file;
    this.processService.patch(process).subscribe(() => {
      this.table.updateTransaction(process);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Process;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.processService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
