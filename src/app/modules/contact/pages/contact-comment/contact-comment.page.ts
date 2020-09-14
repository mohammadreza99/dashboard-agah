import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ContactComment } from '@app/shared/models/contact-comment';
import { ColDef } from 'ag-grid-community';
import { ContactCommentService } from '@app/core/http/contact-comment/contact-comment.service';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-contact-comment',
  templateUrl: './contact-comment.page.html',
  styleUrls: ['./contact-comment.page.scss'],
})
export class ContactCommentPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<ContactComment[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'comment',
      headerName: 'متن نظر',
      editable: false,
    },
  ];

  constructor(
    private contactCommentService: ContactCommentService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.contactCommentService.get();
  }

  addContactComment() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((contactComment: ContactComment) => {
        if (contactComment) {
          this.contactCommentService.post(contactComment).subscribe((res) => {
            this.table.addTransaction(contactComment);
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
        formControlName: 'name',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        formControlName: 'email',
        label: 'ایمیل',
      },
      {
        type: 'textarea',
        label: 'متن نظر',
        labelWidth: 110,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        formControlName: 'comment',
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as ContactComment;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.contactCommentService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
