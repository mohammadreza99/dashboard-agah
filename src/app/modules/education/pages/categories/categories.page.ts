import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Category, DialogFormConfig } from '@shared/models';
import { CategoryService } from '@core/http/cateogry/category.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { TableComponent } from '@shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'ag-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Category[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'label',
      headerName: 'عنوان',
      editable: false,
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.categoryService.get();
  }

  addCategory() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((category: Category) => {
        if (category) {
          this.categoryService.post(category).subscribe((res) => {
            this.table.addTransaction(category);
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
        label: 'عنوان',
        labelWidth: 110,
        formControlName: 'label',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as Category;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.categoryService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
