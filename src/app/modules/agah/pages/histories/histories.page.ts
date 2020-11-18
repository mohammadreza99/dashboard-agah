import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { HistoryItem } from '@shared/models';
import { HistoryService } from '@core/http/history/history.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { DialogFormConfig } from '@shared/models';
import * as moment from 'jalali-moment';

@Component({
  selector: 'ag-histories',
  templateUrl: './histories.page.html',
  styleUrls: ['./histories.page.scss'],
})
export class HistoriesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<HistoryItem[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'time',
      headerName: 'زمان',
      cellRenderer: 'dateRenderer',
      editable: false,
      cellRendererParams: {
        editable: true,
        onChange: (params) => {
          if (params.selectedDate) {
            const history = {
              id: params.rowData.id,
              time: params.selectedDate,
            } as HistoryItem;
            this.historyService.patch(history).subscribe(() => {
              this.table.updateTransaction(history);
              this.dataService.successfullMessage(this.vcRef);
            });
          }
        },
      },
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      editable: false,
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
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((history: HistoryItem) => {
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
        value: moment(),
        labelWidth: 110,
        formControlName: 'time',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'editor',
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
    const history = new HistoryItem();
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
    const history = new HistoryItem();
    history.id = e.rowData.id;
    history[e.field] = e.file;
    this.historyService.patch(history).subscribe(() => {
      this.table.updateTransaction(history);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  editFormConfig(value: string, formControlName: string): DialogFormConfig[] {
    return [
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: formControlName,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as HistoryItem;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.historyService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'edit-content':
        this.historyService.getById(rowData.id).subscribe((post) => {
          this.dialogFormService
            .show(
              'ویرایش محتوا',
              this.editFormConfig(post.description, 'description'),
              '1000px'
            )
            .onClose.subscribe((result) => {
              if (result) {
                const n = {
                  id: rowData.id,
                  description: result.description,
                } as HistoryItem;
                this.historyService.patch(n).subscribe((res) => {
                  this.table.updateTransaction(post);
                  this.dataService.successfullMessage(this.vcRef);
                });
              }
            });
        });
        break;
    }
  }
}
