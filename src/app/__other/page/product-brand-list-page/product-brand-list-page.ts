import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { Brand } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'product-brand-list-page',
  templateUrl: './product-brand-list-page.html',
  styleUrls: ['./product-brand-list-page.scss'],
})
export class ProductBrandListPage implements OnInit {
  constructor(
    private dataService: DataService,
    private dialogFormService: DialogFormService
  ) {}

  brands: Brand[];
  columns: PrimeTableColumn[] = [
    {
      field: 'label',
      header: 'عنوان',
      filterType: '',
      type: 'string',
    },
  ];
  actions: PrimeTableAction[] = [
    {
      tooltip: 'ویرایش',
      icon: 'fas fa-edit',
      color: 'info',
    },
  ];

  ngOnInit() {
    this.loadBrands();
  }

  loadBrands() {
    this.dataService.getBrands().subscribe((response) => {
      this.brands = response.result;
    });
  }

  onAddNewBrandClick() {
    this.dialogFormService
      .show('افزودن برند', [
        {
          type: 'text',
          label: 'عنوان',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'label',
        },
      ])
      .onClose.subscribe((brand) => {
        if (brand)
          this.dataService.addBrand(brand).subscribe(() => {
            this.loadBrands();
          });
      });
  }

  onActionClick(event) {
    if (event.action == 'ویرایش') {
      this.dialogFormService
        .show('ویرایش برند', [
          {
            type: 'text',
            label: 'عنوان',
            labelWidth: 80,
            errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
            formControlName: 'label',
            value: event.row.label,
          },
        ])
        .onClose.subscribe((brand) => {
          if (brand)
            this.dataService
              .updateBrand({ id: event.row.id, label: brand.label })
              .subscribe(() => {
                this.loadBrands();
              });
        });
    }
    if (event.action == 'حذف') {
      this.dataService.removeBrand(event.row.id).subscribe(() => {});
    }
  }
}
