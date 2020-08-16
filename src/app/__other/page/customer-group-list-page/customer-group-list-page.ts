import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { Router } from '@angular/router';
import { CustomerGroup } from 'src/app/model/customer-group.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'customer-group-list-page',
  templateUrl: './customer-group-list-page.html',
  styleUrls: ['./customer-group-list-page.scss']
})
export class CustomerGroupListPage implements OnInit {

  constructor(
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private router: Router
  ) {
    this.dataService.customerGroups.then(customerGroups => {
      this.customerGroups = this.dataService.cloneObj(customerGroups);
      for (const customerGroup of this.customerGroups) {
        Object.assign(customerGroup, {
          count: this.dataService.getCustomersCountOfGroup(customerGroup.id)
        });
      }
    });
  }

  customerGroups: CustomerGroup[];
  columns: PrimeTableColumn[] = [
    {
      field: "label",
      header: "نام",
      filterType: "input",
      type: "string"
    },
    {
      field: "count",
      header: "تعداد مشتری",
      filterType: "input",
      type: "string"
    }
  ];

  actions: PrimeTableAction[] = [
    { tooltip: "لیست مشتریان", icon: "fas fa-users", color: "secondary" },
    { tooltip: "ویرایش", icon: "fas fa-pencil", color: "info" }
  ];

  ngOnInit() {}

  onRowClick(row) {
    this.router.navigate(["/customer/group/edit", row]);
  }

  onActionClick(event) {
    if (event.action == "ویرایش")
      this.dialogFormService
        .show("ویرایش نام گروه", [
          {
            type: "text",
            label: "عنوان گروه",
            value: event.row.label,
            labelWidth: 80,
            errors: [{ type: "required", message: "این فیلد الزامی است." }],
            formControlName: "title"
          }
        ])
        .onClose.subscribe(result => {
          if (result != null) {
          }
        });
    else if (event.action == "لیست مشتریان") {
      this.router.navigate(["/customer/list", event.row.id]);
    }
  }
}
