import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtraField, ExtraFieldGroup } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'product-extra-field-list-page',
  templateUrl: './product-extra-field-list-page.html',
  styleUrls: ['./product-extra-field-list-page.scss'],
})
export class ProductExtraFieldListPage implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  extraFields: ExtraField[] = [];
  columns: PrimeTableColumn[] = [
    { field: 'label', header: 'گروه', type: 'string', filterType: 'dropdown' },
  ];
  actions: PrimeTableAction[] = this.dataService.generalActions;
  pageTitle: string;
  group: ExtraFieldGroup;

  ngOnInit(): void {
    this.group = {
      id: this.route.snapshot.queryParams['groupId'],
      label: this.route.snapshot.queryParams['groupLabel'],
    };
    this.dataService
      .getExtraFieldsByGroupId(this.group.id)
      .subscribe((response) => {
        this.extraFields = response.result;
      });
  }

  onActionClick(event) {
    if (event.action == 'ویرایش') {
      this.router.navigate(['/product/extra-field/edit', event.row.id]);
    } else if (event.action == 'حذف') {
    }
  }
}
