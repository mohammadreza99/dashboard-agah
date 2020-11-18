import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { CourseService } from '@core/http/course/course.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { ActivatedRoute } from '@angular/router';
import { CourseContent, Course, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-course-contents',
  templateUrl: './course-contents.page.html',
  styleUrls: ['./course-contents.page.scss'],
})
export class CourseContentsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<CourseContent[]>;
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
      field: 'content',
      headerName: 'محتوا',
    },
    {
      field: 'week',
      headerName: 'شماره هفته',
    },
  ];
  course: Course;
  pageTitle: string;

  constructor(
    private courseService: CourseService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  getRowData(id) {
    this.rowData$ = this.courseService.getContent(id);
  }

  async loadData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.course = await this.courseService.getById(id).toPromise();
    this.getRowData(id);
    this.pageTitle = `افزودن محتوای دروس - ${this.course.title}`;
  }

  addCourseContent() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1200px')
      .onClose.subscribe((courseContent: CourseContent) => {
        if (courseContent) {
          this.courseService
            .postContent(this.course.id, courseContent)
            .subscribe((res) => {
              this.table.addTransaction(courseContent);
              this.dataService.successfullMessage(this.vcRef);
              this.getRowData(this.course.id);
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
        label: 'محتوا',
        labelWidth: 110,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'شماره هفته',
        labelWidth: 110,
        formControlName: 'week',
        numberOnly: true,
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'فیلم',
        labelWidth: 110,
        formControlName: 'video',
        accept: 'video/*',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const courseContent = new CourseContent();
    courseContent.id = event.data.id;
    if (event.colDef.field !== 'video') {
      const field = event.colDef.field;
      const value = event.value;
      courseContent[field] = value;
    }
    this.courseService
      .patchContent(this.course.id, courseContent)
      .subscribe(() => {
        this.table.updateTransaction(courseContent);
        this.dataService.successfullMessage(this.vcRef);
      });
  }

  onImageSelect(e) {
    const courseContent = new CourseContent();
    courseContent.id = e.rowData.id;
    courseContent[e.field] = e.file;
    this.courseService
      .patchContent(this.course.id, courseContent)
      .subscribe(() => {
        this.table.updateTransaction(courseContent);
        this.dataService.successfullMessage(this.vcRef);
      });
  }

  onActionClick(event) {
    const rowData = event.rowData as CourseContent;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.courseService
            .deleteContent(this.course.id, rowData.id)
            .subscribe(() => {
              this.table.deleteTransaction(rowData);
              this.dataService.successfullMessage(this.vcRef);
            });
        });
        break;
    }
  }
}
