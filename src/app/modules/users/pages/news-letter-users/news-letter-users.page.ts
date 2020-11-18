import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { NewsLetterUserService } from '@core/http/news-letter-user/news-letter-user.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { NewsLetterUser, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-news-letter-users',
  templateUrl: './news-letter-users.page.html',
  styleUrls: ['./news-letter-users.page.scss'],
})
export class NewsLetterUsersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<NewsLetterUser[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
  ];

  constructor(
    private newsLetterUserService: NewsLetterUserService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.newsLetterUserService.get();
  }

  addNewsLetterUser() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((newsLetterUser: NewsLetterUser) => {
        if (newsLetterUser) {
          this.newsLetterUserService.post(newsLetterUser).subscribe((res) => {
            this.table.addTransaction(newsLetterUser);
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
        label: 'ایمیل',
        labelWidth: 110,
        formControlName: 'email',
        errors: [
          { type: 'required', message: 'این فیلد الزامیست' },
          { type: 'email', message: 'ایمیل نامعتبر است' },
        ],
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as NewsLetterUser;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.newsLetterUserService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
