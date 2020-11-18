import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { FeatureService } from '@core/http/feature/feature.service';
import { DataService } from '@core/services/data.service';
import { TableComponent } from '@shared/components/table/table.component';
import { DialogFormService } from '@core/services/dialog-form.service';
import { ColDef } from 'ag-grid-community';
import { Feature, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Feature[]>;
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
  ];

  constructor(
    private featureService: FeatureService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.featureService.get();
  }

  addFeature() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((feature: Feature) => {
        if (feature) {
          this.featureService.post(feature).subscribe((res) => {
            this.table.addTransaction(feature);
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
        formControlName: 'title',
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
    const feature = new Feature();
    feature.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      feature[field] = value;
    }
    this.featureService.patch(feature).subscribe(() => {
      this.table.updateTransaction(feature);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const feature = new Feature();
    feature.id = e.rowData.id;
    feature[e.field] = e.file;
    this.featureService.patch(feature).subscribe(() => {
      this.table.updateTransaction(feature);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Feature;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.featureService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
