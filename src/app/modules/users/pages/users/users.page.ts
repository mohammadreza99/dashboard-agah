import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { UserService } from '@core/http/user/user.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { UserSelect, UserInsert, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<UserSelect[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'username',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'email_verified_at',
      headerName: 'تاریخ تایید ایمیل',
      cellRenderer: 'dateRenderer',
      cellRendererParams: {
        editable: false,
      },
      editable: false,
    },
  ];

  constructor(
    private userService: UserService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.userService.get();
  }

  addUser() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((user: UserInsert) => {
        if (user) {
          this.userService.post(user).subscribe((res) => {
            this.table.addTransaction(user);
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
        label: 'نام',
        labelWidth: 110,
        formControlName: 'name',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
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
      {
        type: 'text',
        label: 'رمز عبور',
        labelWidth: 110,
        formControlName: 'password',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'تایید رمز عبور',
        labelWidth: 110,
        formControlName: 'confirm_password',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }
}
