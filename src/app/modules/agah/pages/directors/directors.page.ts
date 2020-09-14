import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { CompanyPosition } from '@app/shared/models/company-position.model';
import { Observable } from 'rxjs';
import { Director } from '@app/shared/models/director.model';
import { ColDef } from 'ag-grid-community';
import { DirectorService } from '@app/core/http/director/director.service';
import { DataService } from '@app/core/services/data.service';
import { CompanyPositionService } from '@app/core/http/company-position/company-position.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-directors',
  templateUrl: './directors.page.html',
  styleUrls: ['./directors.page.scss'],
})
export class DirectorsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Director[]>;
  columnDefs: ColDef[];
  availablePositions: CompanyPosition[];

  constructor(
    private directorService: DirectorService,
    private dataService: DataService,
    private companyPositionService: CompanyPositionService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.directorService.get();
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

  addDirector() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((director: any) => {
        if (director) {
          const e: Director = {
            first_name: director.first_name,
            last_name: director.last_name,
            company_position_id: director.position,
            image: director.image,
          };
          this.directorService.post(e).subscribe((res) => {
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
        formControlName: 'linkedin',
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
    const director = new Director();
    director.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.data[field];
      director[field] = value;
    }
    this.directorService.patch(director).subscribe(() => {
      this.table.updateTransaction(director);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const director = new Director();
    director.id = e.rowData.id;
    director[e.field] = e.file;
    this.directorService.patch(director).subscribe(() => {
      this.table.updateTransaction(director);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Director;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.directorService.delete(rowData.id).subscribe(() => {
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
