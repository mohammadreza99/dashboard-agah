import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/model/order.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'customer-order-list-page',
  templateUrl: './customer-order-list-page.html',
  styleUrls: ['./customer-order-list-page.scss'],
})
export class CustomerOrderListPage implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.dataService.orders.then((orders) => {
      this.orders = this.dataService.cloneObj(orders);
      for (const order of this.orders)
        this.dataService.getCustomerById(order.customerId).then((customer) => {
          let customerName = customer.firstName + ' ' + customer.lastName;
          Object.assign(order, { customerName: customerName });
        });
    });
  }

  orders: Order[];
  columns: PrimeTableColumn[] = [
    {
      field: 'customerName',
      header: 'مشتری',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'totalPrice',
      header: 'قیمت کل',
      filterType: 'range',
      type: 'string',
    },
    {
      field: 'date',
      header: 'تاریخ',
      type: 'moment',
    },
    {
      field: 'status',
      header: 'وضعیت',
      type: 'string',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'فاکتور', icon: 'fas fa-file-pdf', color: 'secondary' },
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        // نمایش لیست سفارشات یک مشتری خاص
      } else {
        // نمایش تمام سفارشات
      }
    });
  }

  onActionClick(event) {
    if (event.action == 'ویرایش') {
      this.router.navigate(['/customer/order/edit', event.row.id]);
    } else if (event.action == 'حذف') {
      // this.dataService.removeProduct(event.row).then(updatedList => {
      //   this.customers = updatedList;
      // });
    } else if (event.action == 'لیست سفارشات') {
      this.router.navigate(['/customer/edit', event.row.id]);
    }
  }
}
