import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PrimeToastService } from 'src/app/@prime/prime-service/prime-toast.service';
import { DataService } from 'src/app/service/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Product, Category } from 'src/app/model/product.model';
import { catchError } from 'rxjs/operators';
import { PrimeTree } from 'src/app/@prime/prime-model/prime-tree.model';

@Component({
  selector: 'product-modify-page',
  templateUrl: './product-modify-page.html',
  styleUrls: ['./product-modify-page.scss'],
})
export class ProductModifyPage implements OnInit {
  constructor(
    private toaster: PrimeToastService,
    public dataService: DataService,
    private vcRef: ViewContainerRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  product$: Observable<Product>;
  product: Product = new Product();
  pageTitle: string = 'افزودن محصول';
  editMode: boolean = false;
  showExtraFields = false;
  extraFieldEmptyMessage = 'لطفا یک دسته بندی انتخاب کنید.';

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.product$ = this.dataService.getProductById(params['id']).pipe(
          catchError((err) => {
            //doooo
            return throwError(err);
          })
        );
        // .subscribe(response => {
        // this.product = response.result;
        //   this.dataService
        //     .getCategoryById(this.product.categoryId)
        //     .subscribe(category => {
        //       this.dataService.getCategories().subscribe(response => {
        //         this.treeCategories = this.dataService.getTreeModelCategories(
        //           response.result
        //         );
        //         this.createCategorySection(
        //           this.treeCategories,
        //           category.result
        //         );
        //       });
        //     });
        // });
      } else {
        this.editMode = false;
      }
    });
  }

  createCategorySection(categories: PrimeTree[], category: Category) {
    // this.category =
    //   this.dataService.getTreeNodeById(categories, category.id) ||
    //   categories[0];
    // this.expanded(categories, this.category);
  }

  expanded(list: PrimeTree[], node: PrimeTree) {
    if (node.data.id != undefined) {
      let parentNode = this.dataService.getTreeNodeById(
        list,
        node.data.parentId
      );
      parentNode.expanded = true;
      this.expanded(list, parentNode);
    }
  }

  onGeneralChange(event) {
    this.product.name = event.name;
    this.product.nationalCode = event.nationalCode;
    this.product.count = event.count;
    this.product.stock = event.stock.value;
    this.product.isActive = event.isActive;
    this.product.releaseDate = event.releaseDate;
    this.product.description = event.description;
  }

  onPriceChange(event) {
    this.product.price = event.price;
    this.product.discount.type = event.discountType;
    this.product.discount.value = event.discountValue;
    this.product.discount.expireDate = event.discountExpireDate;
  }

  onCategoryChange(event) {
    this.product.categoryId = event;
    this.dataService.getExtraFieldsByCategoryId(event).subscribe((response) => {
      if (response.result.length == 0) {
        this.showExtraFields = false;
        this.extraFieldEmptyMessage =
          'مشخصات اضافی برای این دسته بندی یافت نشد.';
      } else {
        this.showExtraFields = true;
      }
    });
  }

  onSaveClick() {}

  onCancelClick() {
    this.dataService.cancellationConfirm(this.vcRef).then((accept) => {
      this.router.navigate(['/product/list']);
    });
  }
}
