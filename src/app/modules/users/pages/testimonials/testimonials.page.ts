import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { TestimonialService } from '@core/http/testimonial/testimonial.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { Testimonial, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-testimonials',
  templateUrl: './testimonials.page.html',
  styleUrls: ['./testimonials.page.scss'],
})
export class TestimonialsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Testimonial[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
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
      field: 'opinion',
      headerName: 'نظر',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private testimonialService: TestimonialService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.testimonialService.get();
  }

  addTestimonial() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((testimonial: Testimonial) => {
        if (testimonial) {
          this.testimonialService.post(testimonial).subscribe((res) => {
            this.table.addTransaction(testimonial);
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
        type: 'text',
        label: 'نظر',
        labelWidth: 110,
        formControlName: 'opinion',
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
    const testimonial = new Testimonial();
    testimonial.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      testimonial[field] = value;
    }
    this.testimonialService.patch(testimonial).subscribe(() => {
      this.table.updateTransaction(testimonial);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const testimonial = new Testimonial();
    testimonial.id = e.rowData.id;
    testimonial[e.field] = e.file;
    this.testimonialService.patch(testimonial).subscribe(() => {
      this.table.updateTransaction(testimonial);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Testimonial;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.testimonialService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
