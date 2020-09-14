import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import * as moment from 'jalali-moment';
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
export class ProductModifyPage implements OnInit {
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

  availableFeatures: Feature[];
  availablePartners: Partner[];
  availableProcesses: Process[];
  selectedProcesses: Process[] = [];

  pageTitle = 'افزودن محصول';
  editMode = false;

  tabViewIndex = 0;
  disableTabs = [false, true];
  urlToShow: string;

  product: any = {};

  basicInfoForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, [Validators.required]),
    image: new FormControl(null),
    description: new FormControl(null, [Validators.required]),
    website: new FormControl(null, [Validators.required]),
    time_estimate: new FormControl(null, [Validators.required]),
    feature_description: new FormControl(null),
    features: new FormControl(null),
    partners: new FormControl(null),
  });

  ngOnInit() {
    this.fillDropdowns();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.editProduct(id);
    } else {
      this.editMode = false;
    }
  }

  async fillDropdowns() {
    this.availableFeatures = await this.featureService.get().toPromise();
    this.availablePartners = await this.partnerService.get().toPromise();
    this.availableProcesses = await this.processService.get().toPromise();
  }

  async editProduct(id) {
    const product = await this.productService.getById(id).toPromise();
    this.basicInfoForm.patchValue({
      id: product.id,
      title: product.title,
      description: product.description,
      website: product.website,
      feature_description: product.feature_description,
      time_estimate: moment(
        moment(new Date(product.time_estimate)).format('jYYYY,jMM,jDD'),
        'jYYYY,jMM,jDD'
      ),
      features: product.features,
      partners: product.partners,
    });
    this.urlToShow = product.image;
    this.selectedProcesses = product.processes || [];
  }

  onCancelClick() {
    this.dataService.cancellationConfirm(this.vcRef).then((accept) => {
      this.router.navigate(['/dashboard/product/list']);
    });
  }

  onSubmitBasicInfo() {
    const controls = this.basicInfoForm.controls;
    if (this.basicInfoForm.valid) {
      this.product.id = controls.id?.value || null;
      this.product.title = controls.title.value;
      this.product.website = controls.website.value;
      this.product.description = controls.description.value;
      this.product.feature_description = controls.feature_description.value;
      this.product.time_estimate = controls.time_estimate.value;
      this.product.features = Array.from(
        controls.features.value.map((f) => f.id)
      );
      this.product.partners = Array.from(
        controls.partners.value.map((f) => f.id)
      );
      this.goNextTab();
    }
  }

  onSaveClick() {
    this.product.processes = Array.from(
      this.selectedProcesses.map((f) => f.id)
    );

    if (this.editMode) {
      this.productService.patch(this.product).subscribe();
    } else {
      this.productService.post(this.product).subscribe();
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

  onSelectImage(event) {
    this.product.image = event;
  }

  checkDisableForm() {
    for (let i = 0; i < this.disableTabs.length; i++) {
      this.disableTabs[i] = true;
      this.disableTabs[this.tabViewIndex] = false;
    }
  }
}
