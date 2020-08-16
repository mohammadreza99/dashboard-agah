import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { Router } from '@angular/router';
import { PrimeTableComponent } from 'src/app/@prime/prime-element/prime-table/prime-table.component';
import { Product } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'product-list-page',
  templateUrl: './product-list-page.html',
  styleUrls: ['./product-list-page.scss']
})
export class ProductListPage implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private router: Router
  ) {}
  @ViewChild(PrimeTableComponent, { static: true }) primeTable: PrimeTableComponent;

  products: Product[];
  columns: PrimeTableColumn[] = [
    {
      field: "nationalCode",
      header: "کد",
      filterType: "input",
      type: "string"
    },
    {
      field: "name",
      header: "عنوان",
      filterType: "input",
      type: "string"
    },
    // {
    //   field: "categoryName",
    //   header: "دسته بندی",
    //   filterType: "multiSelect",
    //   type: "string"
    // },
    // {
    //   field: "price",
    //   header: "قیمت",
    //   filterType: "range",
    //   type: "string"
    // },
    // {
    //   field: "stock",
    //   header: "وضعیت",
    //   filterType: "multiSelect",
    //   type: "string"
    // },
    // {
    //   field: "isActive",
    //   header: "وضعیت انتشار",
    //   filterType: "dropdown",
    //   type: "boolean"
    // }
  ];
  actions: PrimeTableAction[] = [
    { tooltip: "ایجاد کپی", icon: "fas fa-copy", color: "secondary" },
    { tooltip: "ویرایش", icon: "fas fa-pencil", color: "info" }
  ];

  ngOnInit() {
    this.dataService.getProducts().subscribe(response => {
      this.products = response.result;
    });
  }

  onActionClick(event) {
    if (event.action == "ویرایش") {
      this.router.navigate(["/product/edit", event.row.id]);
    } else if (event.action == "حذف") {
    } else if (event.action == "ایجاد کپی") {
      this.dialogFormService.show("کپی محصول", [
        {
          type: "dropdown",
          label: "کپی به شاخه",
          formControlName: "category",
          dropdownItems: [],
          errors: [{ type: "required", message: "این فیلد الزامی است" }]
        }
      ]);
    }
  }
}
