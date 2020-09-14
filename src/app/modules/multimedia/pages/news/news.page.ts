import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewsService } from '@app/core/http/news/news.service';
import { News } from '@app/shared/models/news.model';
import { Observable } from 'rxjs';
import { DataService } from '@app/core/services/data.service';
import { TableComponent } from '@app/shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<News[]>;
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
    {
      field: 'summary',
      headerName: 'خلاصه',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private newsService: NewsService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.newsService.get();
  }

  addNews() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((news: News) => {
        if (news) {
          this.newsService.post(news).subscribe((res) => {
            this.table.addTransaction(news);
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
        type: 'textarea',
        label: 'خلاصه',
        labelWidth: 110,
        formControlName: 'summary',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 110,
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'content',
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
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onCellValueChanged(event) {
    const news = new News();
    news.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      news[field] = value;
    }
    this.newsService.patch(news).subscribe(() => {
      this.table.updateTransaction(news);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const news = new News();
    news.id = e.rowData.id;
    news[e.field] = e.file;
    this.newsService.patch(news).subscribe(() => {
      this.table.updateTransaction(news);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as News;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.newsService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'edit-content':
        this.newsService.getById(rowData.id).subscribe((news) => {
          this.dialogFormService
            .show('ویرایش', this.editFormConfig(news.content), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                const n = {
                  id: rowData.id,
                  content: result.content,
                } as News;
                this.newsService.patch(n).subscribe((res) => {
                  this.table.updateTransaction(news);
                  this.dataService.successfullMessage(this.vcRef);
                });
              }
            });
        });
        break;
    }
  }
}
