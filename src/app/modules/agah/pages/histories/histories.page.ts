import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { History } from '@app/shared/models/history.model';
import { HistoryService } from '@app/core/http/history/history.service';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<History[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'time',
      headerName: 'زمان',
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private historyService: HistoryService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.historyService.get();
  }

  addHistory() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((history: History) => {
        if (history) {
          this.historyService.post(history).subscribe((res) => {
            this.table.addTransaction(history);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'date-picker',
        label: 'زمان',
        labelWidth: 110,
        formControlName: 'time',
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
    const history = new History();
    history.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      history[field] = value;
    }
    this.historyService.patch(history).subscribe(() => {
      this.table.updateTransaction(history);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const history = new History();
    history.id = e.rowData.id;
    history[e.field] = e.file;
    this.historyService.patch(history).subscribe(() => {
      this.table.updateTransaction(history);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as History;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.historyService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
