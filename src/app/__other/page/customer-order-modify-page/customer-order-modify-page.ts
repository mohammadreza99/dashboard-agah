import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { Product } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';

@Component({
  selector: 'customer-order-modify-page',
  templateUrl: './customer-order-modify-page.html',
  styleUrls: ['./customer-order-modify-page.scss']
})
export class CustomerOrderModifyPage implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  order = new Order();
  products: Product[] = [];
  columns: PrimeTableColumn[] = [
    {
      field: "product",
      header: "محصول"
    },
    {
      field: "cateogry",
      header: "دسته بندی"
    },
    {
      field: "price",
      header: "فی"
    },
    {
      field: "totalPrice",
      header: "قیمت کل"
    }
  ];

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params["id"])
        this.dataService.getOrderById(params["id"]).then(order => {
          this.order = this.dataService.cloneObj(order);
        });
    });
  }
}
