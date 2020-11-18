import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NewsService } from '@core/http/news/news.service';
import { Observable } from 'rxjs';
import { DataService } from '@core/services/data.service';
import { TableComponent } from '@shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { DialogFormService } from '@core/services/dialog-form.service';
import { TagService } from '@core/http/tag/tag.service';
import { SelectItem } from 'primeng';
import { News, DialogFormConfig, Tag } from '@shared/models';

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
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
    {
      field: 'summary',
      headerName: 'خلاصه',
      editable: false,
    },
  ];
  availableTags: Tag[];

  constructor(
    private newsService: NewsService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private tagService: TagService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
    this.loadTags();
  }

  getRowData() {
    this.rowData$ = this.newsService.get();
  }

  async loadTags() {
    this.availableTags = await this.tagService.get().toPromise();
  }

  addNews() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((news: News) => {
        if (news) {
          this.newsService.post(news).subscribe((res) => {
            this.table.addTransaction(news);
            this.dataService.successfullMessage(this.vcRef);
            this.getRowData();
          });
        }
      });
  }

  formConfig(value?: News): DialogFormConfig[] {
    const newsConfig: DialogFormConfig[] = [
      {
        type: 'hidden',
        value: value?.id,
        formControlName: 'id',
      },
      {
        type: 'editor',
        label: 'عنوان',
        labelWidth: 110,
        value: value?.title,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'link',
        label: 'لینک کوتاه',
        labelWidth: 110,
        value: value?.short_link,
        formControlName: 'short_link',
        errors: [
          { type: 'required', message: 'این فیلد الزامیست' },
          { type: 'pattern', message: 'لینک وارد شده صحیح نیست' },
        ],
      },
      {
        type: 'editor',
        label: 'خلاصه',
        labelWidth: 110,
        value: value?.summary,
        formControlName: 'summary',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'multi-select',
        label: 'تگ ها',
        labelWidth: 110,
        formControlName: 'tags',
        value: value?.tags,
        multiSelectItems: this.availableTags.map((item) => {
          return { value: item.id, label: item.tag };
        }),
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
        value: value?.content,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
    if (value) {
      newsConfig.splice(5, 1);
    }
    return newsConfig;
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
      case 'edit':
        this.newsService.getById(rowData.id).subscribe((news) => {
          const n: any = { ...news, tags: news.tags.map((item) => item.id) };
          this.dialogFormService
            .show('ویرایش', this.formConfig(n), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                this.newsService.patch(result).subscribe((res) => {
                  this.table.updateTransaction(news);
                  this.dataService.successfullMessage(this.vcRef);
                  this.getRowData();
                });
              }
            });
        });
        break;
    }
  }
}
