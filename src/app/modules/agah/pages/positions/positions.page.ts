import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { CompanyPosition } from '@app/shared/models/company-position.model';
import { ColDef } from 'ag-grid-community';
import { CompanyPositionService } from '@app/core/http/company-position/company-position.service';
import { DataService } from '@app/core/services/data.service';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-positions',
  templateUrl: './positions.page.html',
  styleUrls: ['./positions.page.scss'],
})
export class PositionsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<CompanyPosition[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'نام',
    },
  ];

  constructor(
    private companyPositionService: CompanyPositionService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.companyPositionService.get();
  }

  addCompanyPosition() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((companyPosition: CompanyPosition) => {
        if (companyPosition) {
          this.companyPositionService.post(companyPosition).subscribe((res) => {
            this.table.addTransaction(companyPosition);
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
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const companyPosition = new CompanyPosition();
    companyPosition.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      companyPosition[field] = value;
    }
    this.companyPositionService.patch(companyPosition).subscribe(() => {
      this.table.updateTransaction(companyPosition);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as CompanyPosition;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.companyPositionService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
