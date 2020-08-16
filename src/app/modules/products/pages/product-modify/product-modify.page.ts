import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ProductService } from '@core/http/product/product.service';
import { Product } from '@shared/models/product.model';
import { DataService } from '@app/core/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TabView } from 'primeng';

@Component({
  selector: 'ag-product-modify',
  templateUrl: './product-modify.page.html',
  styleUrls: ['./product-modify.page.scss'],
})
export class ProductModifyPage implements OnInit, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private dataService: DataService,
    private router: Router,
    private vcRef: ViewContainerRef
  ) {}
  @ViewChild('tabView', { static: true }) tabview: TabView;
  /*
  title: string;
  image: string;
  description: string;
  website: string;
  feature_description: string;
  time_estimate: Date;
  features: Feature[];
  processes: Process[];
*/
  product: Product = new Product();
  pageTitle = 'افزودن محصول';
  tabViewIndex = 0;
  disableTabs = [];
  editMode = false;
  basicInfoForm = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    website: new FormControl(null, [Validators.required]),
    time_estimate: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.productService
          .getProductById(params['id'])
          .pipe(
            catchError((err) => {
              return throwError(err);
            })
          )
          .subscribe((product) => {
            this.product = product;
          });
      } else {
        this.editMode = false;
      }
    });
  }

  ngAfterViewInit() {
    const tabViewItems = this.tabview.el.nativeElement.querySelector(
      '.ui-tabview-nav'
    ).childNodes as Array<any>;
    for (const item of tabViewItems) {
      if (item.nodeName === 'LI') {
        this.disableTabs.push(true);
      }
    }
    this.disableTabs[0] = false;
  }

  onSaveClick() {}

  onCancelClick() {
    this.dataService.cancellationConfirm(this.vcRef).then((accept) => {
      this.router.navigate(['/dashborad/product/list']);
    });
  }

  onSubmitBasicInfo() {
    if (this.basicInfoForm.valid) {
      this.goNextTab();
    }
  }

  goNextTab() {
    this.tabViewIndex++;
    this.checkDisable();
  }

  goPrevTab() {
    this.tabViewIndex--;
    this.checkDisable();
  }

  checkDisable() {
    for (let i = 0; i < this.disableTabs.length; i++) {
      this.disableTabs[i] = true;
      this.disableTabs[this.tabViewIndex] = false;
    }
  }
}
