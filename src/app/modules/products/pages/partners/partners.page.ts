import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { PartnerService } from '@core/http/partner/partner.service';
import { DataService } from '@core/services/data.service';
import { Observable } from 'rxjs';
import { TableComponent } from '@shared/components/table/table.component';
import { DialogFormService } from '@core/services/dialog-form.service';
import { ColDef } from 'ag-grid-community';
import { Partner, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Partner[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'name',
      headerName: 'عنوان',
    },
  ];

  constructor(
    private partnerService: PartnerService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.partnerService.get();
  }

  addPartner() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((partner: Partner) => {
        if (partner) {
          this.partnerService.post(partner).subscribe((res) => {
            this.table.addTransaction(partner);
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
        formControlName: 'name',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'لوگو',
        labelWidth: 110,
        formControlName: 'logo',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const partner = new Partner();
    partner.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      partner[field] = value;
    }
    this.partnerService.patch(partner).subscribe(() => {
      this.table.updateTransaction(partner);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const partner = new Partner();
    partner.id = e.rowData.id;
    partner[e.field] = e.file;
    this.partnerService.patch(partner).subscribe(() => {
      this.table.updateTransaction(partner);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Partner;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.partnerService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
