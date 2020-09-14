import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { Course, Teacher } from '@app/shared/models/education';
import { ColDef } from 'ag-grid-community';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { Router } from '@angular/router';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { CourseService } from '@app/core/http/course/course.service';
import { TeacherService } from '@app/core/http/tracher/teacher.service';

@Component({
  selector: 'ag-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Course[]>;
  columnDefs: ColDef[];
  availableTeachers: Teacher[];

  constructor(
    private courseService: CourseService,
    private dataService: DataService,
    private teacherService: TeacherService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  async loadData() {
    this.availableTeachers = await this.teacherService.get().toPromise();
    this.rowData$ = this.courseService.get();
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
        field: 'content',
        headerName: 'توضیحات',
        cellEditor: 'agLargeTextCellEditor',
      },
    ];
  }

  addCourse() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((course: Course) => {
        if (course) {
          this.courseService.post(course).subscribe((res) => {
            this.table.addTransaction(course);
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
    const course = new Course();
    course.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.data[field];
      course[field] = value;
    }
    this.courseService.patch(course).subscribe(() => {
      this.table.updateTransaction(course);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const course = new Course();
    course.id = e.rowData.id;
    course[e.field] = e.file;
    this.courseService.patch(course).subscribe(() => {
      this.table.updateTransaction(course);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Course;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.courseService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'add-content':
        this.router.navigate([
          '/dashboard/education/course-content',
          rowData.id,
        ]);
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
