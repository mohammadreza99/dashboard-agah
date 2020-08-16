import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { DialogFormService } from '@core/services/dialog-form.service';
import { PrimeTableComponent } from '@shared/components/@prime/prime-element/prime-table/prime-table.component';
import { PrimeTableColumn } from '@shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@shared/components/@prime/prime-model/prime-table-action.model';
import { Product } from '@shared/models/product.model';
import { ProductService } from '@core/http/product/product.service';

@Component({
  selector: 'ag-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  products$: Observable<Product[]>;
  columns: PrimeTableColumn[] = [
    {
      field: 'id',
      header: 'کد',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'title',
      header: 'عنوان',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'website',
      header: 'وبسایت',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'time_estimate',
      header: 'زمان ارائه',
      filterType: 'input',
      type: 'string',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  ngOnInit(): void {
    this.products$ = this.productService.get();
  }

  onActionClick(event) {
    if (event.action === 'ویرایش') {
      this.router.navigate(['/dashboard/product/edit', event.row.id]);
    } else if (event.action === 'حذف') {
    }
  }
}
