import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { Workshop, Teacher } from '@app/shared/models/education';
import { ColDef } from 'ag-grid-community';
import * as moment from 'jalali-moment';

import { WorkshopService } from '@app/core/http/workshop/workshop.service';
import { DataService } from '@app/core/services/data.service';
import { TeacherService } from '@app/core/http/tracher/teacher.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
@Component({
  selector: 'ag-workshop',
  templateUrl: './workshop.page.html',
  styleUrls: ['./workshop.page.scss'],
})
export class WorkshopPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Workshop[]>;
  columnDefs: ColDef[];
  availableTeachers: Teacher[];

  constructor(
    private workshopService: WorkshopService,
    private dataService: DataService,
    private teacherService: TeacherService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.availableTeachers = await this.teacherService.get().toPromise();
    this.rowData$ = this.workshopService.get();
    this.columnDefs = [
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
        field: 'teacher_id',
        headerName: 'استاد',
        cellRenderer: (params) => {
          return this.teacherCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availableTeachers.map(
            (teacher) => teacher.first_name + ' ' + teacher.last_name
          ),
        },
        onCellValueChanged: (params) => {
          params.data.teacher_id = getByTitleCellRenderer(
            params.data.teacher_id,
            this.availableTeachers
          );
        },
      },
      {
        field: 'time',
        headerName: 'زمان',
        editable: false,
        cellRenderer: 'dateRenderer',
        cellRendererParams: {
          editable: true,
          onChange: (params) => {
            if (params.selectedDate) {
              const workshop = {
                id: params.rowData.id,
                time: params.selectedDate,
              } as Workshop;
              this.workshopService.patch(workshop).subscribe(() => {
                this.table.updateTransaction(workshop);
                this.dataService.successfullMessage(this.vcRef);
              });
            }
          },
        },
      },
      {
        field: 'location',
        headerName: 'آدرس',
        cellEditor: 'agLargeTextCellEditor',
      },
      {
        field: 'link',
        headerName: 'لینک',
      },
      {
        field: 'content',
        headerName: 'توضیحات',
        cellEditor: 'agLargeTextCellEditor',
      },
    ];
  }

  addWorkshop() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((workshop: Workshop) => {
        if (workshop) {
          this.workshopService.post(workshop).subscribe((res) => {
            this.table.addTransaction(workshop);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  teacherCellRenderer(params) {
    return getByIdCellRenderer(params.data.teacher_id, this.availableTeachers);
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
        type: 'dropdown',
        label: 'استاد',
        labelWidth: 110,
        dropdownItems: this.availableTeachers.map((item) => {
          return {
            label: item.first_name + ' ' + item.last_name,
            value: item.id,
          };
        }),
        formControlName: 'teacher_id',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'لینک',
        labelWidth: 110,
        formControlName: 'link',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'آدرس',
        labelWidth: 110,
        formControlName: 'location',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
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
        formControlName: 'content',
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
    const workshop = new Workshop();
    workshop.id = event.data.id;
    const field = event.colDef.field;
    const value = event.data[field];
    if (event.colDef.field !== 'image') {
      workshop[field] = value;
    }
    if (event.colDef.field === 'time') {
      workshop[field] = value.selectedDate;
    }
    this.workshopService.patch(workshop).subscribe(() => {
      this.table.updateTransaction(workshop);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const workshop = new Workshop();
    workshop.id = e.rowData.id;
    workshop[e.field] = e.file;
    this.workshopService.patch(workshop).subscribe(() => {
      this.table.updateTransaction(workshop);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Workshop;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.workshopService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}

function getByIdCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.id === condtion) {
      value = item.first_name + ' ' + item.last_name;
    }
  });
  return value;
}

function getByTitleCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.first_name + ' ' + item.last_name === condtion) {
      value = item.id;
    }
  });
  return value;
}
