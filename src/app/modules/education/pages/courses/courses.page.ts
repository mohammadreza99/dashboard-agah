import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { Router } from '@angular/router';
import { CourseService } from '@core/http/course/course.service';
import { TeacherService } from '@core/http/tracher/teacher.service';
import {
  Course,
  Teacher,
  DialogFormConfig,
  Category,
  Tag,
} from '@shared/models';
import { CategoryService } from '@app/core/http/cateogry/category.service';
import { TagService } from '@app/core/http/tag/tag.service';

@Component({
  selector: 'ag-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Course[]>;
  availableTeachers: Teacher[];
  availableCategories: Category[];
  availableTags: Tag[];
  columnDefs = [
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
      field: 'teacher.last_name',
      headerName: 'استاد',
      editable: false,
    },
    {
      field: 'category.label',
      headerName: 'دسته بندی',
      editable: false,
    },
    {
      field: 'content',
      headerName: 'توضیحات',
      editable: false,
    },
  ];

  constructor(
    private courseService: CourseService,
    private dataService: DataService,
    private teacherService: TeacherService,
    private categoryService: CategoryService,
    private dialogFormService: DialogFormService,
    private tagService: TagService,
    private vcRef: ViewContainerRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  getRowData() {
    this.rowData$ = this.courseService.get();
  }

  async loadData() {
    this.availableTeachers = await this.teacherService.get().toPromise();
    this.availableCategories = await this.categoryService.get().toPromise();
    this.availableTags = await this.tagService.get().toPromise();
    this.getRowData();
  }

  addCourse() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((course: Course) => {
        if (course) {
          this.courseService.post(course).subscribe((res) => {
            this.table.addTransaction(course);
            this.dataService.successfullMessage(this.vcRef);
            this.getRowData();
          });
        }
      });
  }

  formConfig(value?: Course): DialogFormConfig[] {
    const newsConfig: DialogFormConfig[] = [
      {
        type: 'hidden',
        value: value?.id,
        formControlName: 'id',
      },
      {
        type: 'text',
        label: 'عنوان',
        value: value?.title,
        labelWidth: 110,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        label: 'استاد',
        labelWidth: 110,
        value: value?.teacher_id,
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
        type: 'dropdown',
        label: 'دسته بندی',
        labelWidth: 110,
        value: value?.category_id,
        dropdownItems: this.availableCategories.map((item) => {
          return {
            label: item.label,
            value: item.id,
          };
        }),
        formControlName: 'category_id',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'multi-select',
        label: 'تگ ها',
        labelWidth: 110,
        value: value?.tags,
        formControlName: 'tags',
        multiSelectItems: this.availableTags.map((item) => {
          return { value: item.id, label: item.tag };
        }),
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'textarea',
        label: 'توضیحات',
        labelWidth: 110,
        value: value?.content,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'checkbox',
        label: 'جزو بهترین دوره ها باشد',
        value: value?.best || false,
        labelWidth: 110,
        formControlName: 'best',
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 110,
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
    if (value) {
      newsConfig.splice(7, 1);
    }
    return newsConfig;
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
      case 'edit':
        this.courseService.getById(rowData.id).subscribe((course) => {
          const c: any = {
            ...course,
            tags: course.tags.map((item) => item.id),
          };
          this.dialogFormService
            .show('ویرایش', this.formConfig(c), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                this.courseService.patch(result).subscribe((res) => {
                  this.table.updateTransaction(course);
                  this.dataService.successfullMessage(this.vcRef);
                  this.getRowData();
                });
              }
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
