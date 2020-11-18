import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { StockholderService } from '@core/http/stockholder/stockholder.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { Stockholder, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-stockholders',
  templateUrl: './stockholders.page.html',
  styleUrls: ['./stockholders.page.scss'],
})
export class StockholdersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Stockholder[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'نام',
    },
  ];

  constructor(
    private stockholderService: StockholderService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.stockholderService.get();
  }

  addStockholder() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((stockholder: Stockholder) => {
        if (stockholder) {
          this.stockholderService.post(stockholder).subscribe((res) => {
            this.table.addTransaction(stockholder);
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
        formControlName: 'name',
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
    const stockholder = new Stockholder();
    stockholder.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      stockholder[field] = value;
    }
    this.stockholderService.patch(stockholder).subscribe(() => {
      this.table.updateTransaction(stockholder);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const stockholder = new Stockholder();
    stockholder.id = e.rowData.id;
    stockholder[e.field] = e.file;
    this.stockholderService.patch(stockholder).subscribe(() => {
      this.table.updateTransaction(stockholder);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Stockholder;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.stockholderService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
