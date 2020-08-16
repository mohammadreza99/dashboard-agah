import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { PrimeTreeTable } from 'src/app/@prime/prime-model/prime-tree-table.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'product-category-list-page',
  templateUrl: './product-category-list-page.html',
  styleUrls: ['./product-category-list-page.scss']
})
export class ProductCategoryListPage implements OnInit {

  constructor(
    private dataService: DataService,
    private router: Router,
    private vcRef: ViewContainerRef
  ) {}

  treeTableCategories: PrimeTreeTable[] = [];
  columns: PrimeTableColumn[] = [
    { field: "label", header: "عنوان", type: "string", filterType: "dropdown" }
  ];
  actions: PrimeTableAction[] = this.dataService.generalActions;

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.dataService.getCategories().subscribe(response => {
      this.treeTableCategories = this.dataService.getTreeTableModelCategories(
        response.result
      );
    });
  }

  onActionClick(event) {
    if (event.action == "ویرایش") {
      this.router.navigate(["/product/category/edit", event.row.id]);
    } else if (event.action == "حذف") {
      this.dataService.removeCategory(event.row.id).subscribe();
      this.loadCategories();
    }
  }
}
