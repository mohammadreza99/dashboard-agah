import { Component, OnInit } from '@angular/core';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { DataService } from 'src/app/service/data.service';
import { Feature } from 'src/app/model/product.model';
import { DialogFormConfig } from 'src/app/type/dialog-form-config';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';

@Component({
  selector: 'product-feature-tab',
  templateUrl: './product-feature-tab.component.html',
  styleUrls: ['./product-feature-tab.component.scss']
})
export class ProductFeatureTabComponent implements OnInit {

  constructor(
    private dialogFormService: DialogFormService,
    private dataService: DataService
  ) {}

  selectedFeatures: Feature[] = [];
  featuresActions: PrimeTableAction[] = this.dataService.generalActions;
  featuresColumns: PrimeTableColumn[] = [
    {
      field: "feature",
      header: "عنوان خصیصه",
      filterType: "",
      type: "string"
    },
    {
      field: "value",
      header: "مقدار خصیصه",
      filterType: "",
      type: "string"
    }
  ];
  ngOnInit() {}

  featuresActionClick(event) {
    // let feature = this.product.features[event.row.index - 1];
    // if (event.action == "ویرایش") {
    //   this.editFeature(feature);
    // } else if (event.action == "حذف") {
    //   this.deleteFeature(feature);
    // }
  }

  onAddNewFeature() {
    this.dialogFormService
      .show("خصوصیات محصول", [
        {
          type: "dropdown",
          label: "خصوصیت",
          labelWidth: 80,
          errors: [{ type: "required", message: "این فیلد الزامی است." }],
          formControlName: "feature",
          dropdownItems: [
            {
              label: "رنگ",
              value: "رنگ"
            }
          ]
        },
        {
          type: "dropdown",
          label: "مقدار",
          labelWidth: 80,
          errors: [{ type: "required", message: "این فیلد الزامی است." }],
          formControlName: "value",
          dropdownItems: [
            {
              label: "قرمز",
              value: "قرمز"
            },
            {
              label: "ابی",
              value: "ابی"
            }
          ]
        }
      ])
      .onClose.subscribe(feature => {
        if (feature != null) {
        }
      });
  }

  editFeature(feature) {
    let featureEditForm: DialogFormConfig[] = [
      {
        type: "dropdown",
        label: "خصوصیت",
        labelWidth: 80,
        errors: [{ type: "required", message: "این فیلد الزامی است." }],
        formControlName: "feature",
        dropdownItems: [
          {
            label: "رنگ",
            value: "رنگ"
          }
        ],
        value: feature.feature
      },
      {
        type: "dropdown",
        label: "مقدار",
        labelWidth: 80,
        errors: [{ type: "required", message: "این فیلد الزامی است." }],
        formControlName: "value",
        dropdownItems: [
          {
            label: "قرمز",
            value: "قرمز"
          },
          {
            label: "ابی",
            value: "ابی"
          }
        ],
        value: feature.value
      }
    ];
    this.dialogFormService
      .show("ویرایش خصوصیت", featureEditForm)
      .onClose.subscribe(feature => {});
  }

  deleteFeature(feature) {}
}
