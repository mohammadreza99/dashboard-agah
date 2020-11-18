import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { NewsLetterService } from '@core/http/news-letter/news-letter.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { NewsLetter, DialogFormConfig } from '@shared/models';
import * as moment from 'jalali-moment';

@Component({
  selector: 'ag-news-letters',
  templateUrl: './news-letters.page.html',
  styleUrls: ['./news-letters.page.scss'],
})
export class NewsLettersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<NewsLetter[]>;
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
      field: 'schedule',
      headerName: 'زمان',
      editable: false,
      cellRenderer: 'dateRenderer',
      cellRendererParams: {
        editable: true,
        onChange: (params) => {
          if (params.selectedDate) {
            const workshop = {
              id: params.rowData.id,
              schedule: params.selectedDate,
            } as NewsLetter;
            this.newsLetterService.patch(workshop).subscribe(() => {
              this.table.updateTransaction(workshop);
              this.dataService.successfullMessage(this.vcRef);
            });
          }
        },
      },
    },
  ];

  constructor(
    private newsLetterService: NewsLetterService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.newsLetterService.get();
  }

  addNewsLetter() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((newsLetter: NewsLetter) => {
        if (newsLetter) {
          this.newsLetterService.post(newsLetter).subscribe((res) => {
            this.table.addTransaction(newsLetter);
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
        type: 'date-picker',
        label: 'زمان',
        labelWidth: 110,
        formControlName: 'schedule',
        value: moment(),
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'template',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  editFormConfig(value: string): DialogFormConfig[] {
    return [
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'template',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onCellValueChanged(event) {
    const newsLetter = new NewsLetter();
    newsLetter.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      newsLetter[field] = value;
    }
    this.newsLetterService.patch(newsLetter).subscribe(() => {
      this.table.updateTransaction(newsLetter);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const newsLetter = new NewsLetter();
    newsLetter.id = e.rowData.id;
    newsLetter[e.field] = e.file;
    this.newsLetterService.patch(newsLetter).subscribe(() => {
      this.table.updateTransaction(newsLetter);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as NewsLetter;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.newsLetterService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'edit-template':
        this.newsLetterService.getById(rowData.id).subscribe((newsLetter) => {
          this.dialogFormService
            .show('ویرایش', this.editFormConfig(newsLetter.template), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                const n = {
                  id: rowData.id,
                  template: result.template,
                } as NewsLetter;
                this.newsLetterService.patch(n).subscribe((res) => {
                  this.table.updateTransaction(newsLetter);
                  this.dataService.successfullMessage(this.vcRef);
                });
              }
            });
        });
        break;
    }
  }
}
