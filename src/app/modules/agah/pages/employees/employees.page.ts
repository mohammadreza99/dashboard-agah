import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { EmployeeService } from '@app/core/http/employee/employee.service';
import { DataService } from '@app/core/services/data.service';
import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';
import { CompanyPosition } from '@app/shared/models/company-position.model';
import { CompanyPositionService } from '@app/core/http/company-position/company-position.service';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'ag-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Employee[]>;
  columnDefs: ColDef[];
  availablePositions: CompanyPosition[];

  constructor(
    private employeeService: EmployeeService,
    private dataService: DataService,
    private companyPositionService: CompanyPositionService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.employeeService.get();
    this.availablePositions = await this.companyPositionService
      .get()
      .toPromise();
    this.columnDefs = [
      {
        field: 'first_name',
        headerName: 'نام',
      },
      {
        field: 'last_name',
        headerName: 'نام خانوادگی',
      },
      {
        field: 'company_position_id',
        headerName: 'سمت',
        cellRenderer: (params) => {
          return this.positionCellRenderer(params);
        },
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: this.availablePositions.map((position) => position.title),
        },
        onCellValueChanged: (params) => {
          params.data.company_position_id = getByTitleCellRenderer(
            params.data.company_position_id,
            this.availablePositions
          );
        },
      },
    ];
  }

  addEmployee() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((employee: any) => {
        if (employee) {
          const e: Employee = {
            first_name: employee.first_name,
            last_name: employee.last_name,
            company_position_id: employee.company_position_id,
            social_accounts: { linkedin: employee.linkedin },
            image: employee.image,
          };
          this.employeeService.post(e).subscribe((res) => {
            this.table.addTransaction(e);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  positionCellRenderer(params) {
    return getByIdCellRenderer(
      params.data.company_position_id,
      this.availablePositions
    );
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
        label: 'لینکدین',
        labelWidth: 110,
        formControlName: 'linkedin',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'dropdown',
        label: 'سمت',
        labelWidth: 110,
        dropdownItems: this.availablePositions.map((item) => {
          return { label: item.title, value: item.id };
        }),
        formControlName: 'company_position_id',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'تصویر',
        labelWidth: 110,
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const employee = new Employee();
    employee.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.data[field];
      employee[field] = value;
    }
    this.employeeService.patch(employee).subscribe(() => {
      this.table.updateTransaction(employee);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const employee = new Employee();
    employee.id = e.rowData.id;
    employee[e.field] = e.file;
    this.employeeService.patch(employee).subscribe(() => {
      this.table.updateTransaction(employee);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Employee;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.employeeService.delete(rowData.id).subscribe(() => {
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
      value = item.title;
    }
  });
  return value;
}

function getByTitleCellRenderer(condtion: any, items: any) {
  let value;
  items.forEach((item) => {
    if (item.title === condtion) {
      value = item.id;
    }
  });
  return value;
}
