import { Component, OnInit } from '@angular/core';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { DataService } from 'src/app/service/data.service';
import { Feature, FeatureValue } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';
import { DialogFormConfig } from 'src/app/type/dialog-form-config';

@Component({
  selector: 'product-feature-list-page',
  templateUrl: './product-feature-list-page.html',
  styleUrls: ['./product-feature-list-page.scss'],
})
export class ProductFeatureListPage implements OnInit {
  constructor(
    private dialogFormService: DialogFormService,
    private dataService: DataService
  ) {}

  features: Feature[];
  featureTypes = [
    { label: 'لیست', value: 1 },
    { label: 'رنگ', value: 2 },
  ];
  columns: PrimeTableColumn[] = [
    {
      field: 'label',
      header: 'عنوان',
      type: 'string',
    },
    {
      field: 'values.label',
      header: 'مقدار خصیصه',
      type: 'string',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'افزودن مقدار', icon: 'fa fa-plus', color: 'success' },
    ...this.dataService.generalActions,
  ];

  ngOnInit() {
    this.loadFeatures();
  }

  loadFeatures() {
    this.dataService.getFeatures().subscribe((response) => {
      this.features = response.result;
    });
  }

  onAddFeatureClick() {
    this.dialogFormService
      .show('خصوصیات محصول', [
        {
          type: 'text',
          label: 'عنوان',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'label',
        },
        {
          type: 'dropdown',
          label: 'نوع',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'type',
          dropdownItems: this.featureTypes,
          value: 1,
        },
      ])
      .onClose.subscribe((feature: Feature) => {
        if (feature != null) {
          this.dataService.addFeature(feature).subscribe();
          this.loadFeatures();
        }
      });
  }

  onFeatureValueClick(event) {
    let form: DialogFormConfig[] = [];
    if (event.row.type == 'انتخاب رنگ')
      form = [
        {
          type: 'text',
          label: 'مقدار',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'label',
          value: '',
        },
        {
          type: 'color-picker',
          label: 'کد رنگ',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'color',
          value: '',
          inline: false,
        },
      ];
    else
      form = [
        {
          type: 'text',
          label: 'مقدار',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'title',
          value: '',
        },
      ];
    this.dialogFormService
      .show('ویرایش مقدار', form)
      .onClose.subscribe((result) => {});
  }

  onActionClick(event) {
    if (event.action == 'افزودن مقدار') {
      let form: DialogFormConfig[] = [];
      if (event.row.type == 'انتخاب رنگ')
        form = [
          {
            type: 'hidden',
            formControlName: 'featureId',
            value: event.row.id,
          },
          {
            type: 'text',
            label: 'رنگ',
            labelWidth: 80,
            errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
            formControlName: 'label',
          },
          {
            type: 'color-picker',
            label: 'کد رنگ',
            labelWidth: 80,
            errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
            formControlName: 'colorCode',
            value: '#000000',
          },
        ];
      else if (event.row.type == 'لیسیت')
        form = [
          {
            type: 'hidden',
            formControlName: 'featureId',
            value: event.row.id,
          },
          {
            type: 'text',
            label: 'مقدار',
            labelWidth: 80,
            errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
            formControlName: 'label',
          },
        ];
      this.dialogFormService
        .show('افزودن مقدار', form)
        .onClose.subscribe((featureValue: FeatureValue) => {
          if (featureValue)
            this.dataService.addFeatureValue(featureValue).subscribe();
        });
    } else if (event.action == 'ویرایش') {
      let form = [];
      form = [
        {
          type: 'hidden',
          formControlName: 'id',
          value: event.row.id,
        },
        {
          type: 'text',
          label: 'عنوان',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'label',
          value: event.row.label,
        },
        {
          type: 'dropdown',
          label: 'نوع',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'type',
          dropdownItems: this.featureTypes,
          value: event.row.type,
        },
      ];
      this.dialogFormService
        .show('خصوصیات محصول', form)
        .onClose.subscribe((feature) => {
          if (feature) {
            this.dataService.updateFeature(feature).subscribe();
            this.loadFeatures();
          }
        });
    } else if (event.action == 'حذف') {
      this.dataService.removeFeature(event.row.id).subscribe();
      this.loadFeatures();
    }
  }
}
