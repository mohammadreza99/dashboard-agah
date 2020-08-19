import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';

import { ProductService } from '@core/http/product/product.service';
import {
  Product,
  Process,
  Feature,
  Partner,
} from '@shared/models/product.model';
import { DataService } from '@app/core/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TabView } from 'primeng';
import { ProcessService } from '@app/core/http/process/process.service';
import { FeatureService } from '@app/core/http/feature/feature.service';
import { PartnerService } from '@app/core/http/partner/partner.service';

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
    private vcRef: ViewContainerRef,
    private processService: ProcessService,
    private partnerService: PartnerService,
    private featureService: FeatureService
  ) {}
  @ViewChild('tabView', { static: true }) tabview: TabView;

  features$: Observable<Feature[]>;
  partners$: Observable<Partner[]>;
  target: Process[];
  source$: Observable<Process[]>;
  product$: Observable<Product>;
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
    features: new FormControl(null, [Validators.required]),
    partners: new FormControl(null, [Validators.required]),
  });

  ngOnInit() {
    this.features$ = this.featureService.get();
    this.partners$ = this.partnerService.get();
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.editMode = true;
        this.product$ = this.productService.getProductById(params['id']);
      } else {
        this.editMode = false;
        this.source$ = this.processService.get();
        this.target = [];
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
      this.router.navigate(['/dashboard/product/list']);
    });
  }

  onSubmitBasicInfo() {
    if (this.basicInfoForm.valid) {
      this.goNextTab();
    }
  }

  goNextTab() {
    this.tabViewIndex++;
    this.checkDisableForm();
  }

  goPrevTab() {
    this.tabViewIndex--;
    this.checkDisableForm();
  }

  checkDisableForm() {
    for (let i = 0; i < this.disableTabs.length; i++) {
      this.disableTabs[i] = true;
      this.disableTabs[this.tabViewIndex] = false;
    }
  }

  onMoveToTarget() {}

  onMoveToSource() {}
  onMoveAllToTarget() {}
  onMoveAllToSource() {}
  onSourceReorder() {}
  onTargetReorder() {}
}
