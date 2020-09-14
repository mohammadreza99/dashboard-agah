import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { Teacher } from '@app/shared/models/education';
import { ColDef } from 'ag-grid-community';
import { TeacherService } from '@app/core/http/tracher/teacher.service';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-teachers',
  templateUrl: './teachers.page.html',
  styleUrls: ['./teachers.page.scss'],
})
export class TeachersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Teacher[]>;
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
    {
      field: 'description',
      headerName: 'توضیحات',
      cellEditor: 'agLargeTextCellEditor',
    },
    {
      field: 'linkedin',
      headerName: 'لینکدین',
    },
  ];

  constructor(
    private teacherService: TeacherService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.teacherService.get();
  }

  addTeacher() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((teacher: Teacher) => {
        if (teacher) {
          this.teacherService.post(teacher).subscribe((res) => {
            this.table.addTransaction(teacher);
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
        type: 'textarea',
        label: 'توضیحات',
        labelWidth: 110,
        formControlName: 'description',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'لینکدین',
        labelWidth: 110,
        formControlName: 'linkedin',
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
    const teacher = new Teacher();
    teacher.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      teacher[field] = value;
    }
    this.teacherService.patch(teacher).subscribe(() => {
      this.table.updateTransaction(teacher);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const teacher = new Teacher();
    teacher.id = e.rowData.id;
    teacher[e.field] = e.file;
    this.teacherService.patch(teacher).subscribe(() => {
      this.table.updateTransaction(teacher);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Teacher;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.teacherService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
