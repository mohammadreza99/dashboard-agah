import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

import { Product, Partner } from '@shared/models/product.model';
import { ProductService } from '@core/http/product/product.service';
import { DataService } from '@app/core/services/data.service';
import { PartnerService } from '@app/core/http/partner/partner.service';
import { Router } from '@angular/router';
import { ColDef } from 'ag-grid-community';
import { TableComponent } from '@app/shared/components/table/table.component';

@Component({
  selector: 'ag-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {
  @ViewChild(TableComponent, { static: true }) table: TableComponent;

  constructor(
    private productService: ProductService,
    private partnerService: PartnerService,
    private dataService: DataService,
    private router: Router,
    private vcRef: ViewContainerRef
  ) {}
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
    {
      field: 'description',
      headerName: 'توضیحات',
      editable: false,
    },
  ];
  rowData$: Observable<Product[]>;
  availablePartners$: Observable<Partner[]>;

  ngOnInit(): void {
    this.rowData$ = this.productService.get();
    this.availablePartners$ = this.partnerService.get();
  }

  onSubmit(product: Product) {
    this.productService.post(product).subscribe(() => {
      this.table.addTransaction(product);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const product = new Product();
    product.id = e.rowData.id;
    product[e.field] = e.file;
    this.productService.patch(product).subscribe(() => {
      this.table.updateTransaction(product);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  cellValueChanged(event) {
    const product = new Product();
    const field = event.colDef.field;
    const value = event.value;
    product.id = event.data.id;
    product[field] = value;
    this.productService.patch(product).subscribe(() => {
      this.table.updateTransaction(product);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const product = event.rowData as Product;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.productService.delete(product.id).subscribe(() => {
            this.table.deleteTransaction(product);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'edit':
        this.router.navigate(['/dashboard/product/edit', product.id]);
        break;
    }
  }
}
