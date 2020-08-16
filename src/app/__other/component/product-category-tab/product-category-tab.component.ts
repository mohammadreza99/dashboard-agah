import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import { Product } from "src/app/model/product.model";
import { DataService } from 'src/app/service/data.service';
import { PrimeTree } from 'src/app/@prime/prime-model/prime-tree.model';

@Component({
  selector: 'product-category-tab',
  templateUrl: './product-category-tab.component.html',
  styleUrls: ['./product-category-tab.component.scss']
})
export class ProductCategoryTabComponent implements OnInit {

  constructor(private dataService: DataService) {}
  @Input() product: Product;
  @Output() onChange = new EventEmitter();

  treeCategories: PrimeTree[];
  selectedCategory: PrimeTree;

  ngOnInit() {
    this.dataService.getCategories().subscribe(response => {
      this.treeCategories = this.dataService.setParentCategoriesUnselectable(
        this.dataService.getTreeModelCategories(response.result)
      );
    });
  }

  onCategorySelect(event) {
    this.onChange.emit(event.data.id);
    // this.allExtraFields = [];
    // this.dataService
    //   .getExtraFieldsByCategoryId(event.data.id)
    //   .subscribe(response => {
    //     for (const id of response.result) {
    //       this.dataService.getExtraFieldById(id).subscribe(extraField => {
    //         this.allExtraFields.push(
    //           this.dataService.convertExtraFieldToTreeItem(extraField.result)
    //         );
    //       });
    //     }
    //   });
  }

}
