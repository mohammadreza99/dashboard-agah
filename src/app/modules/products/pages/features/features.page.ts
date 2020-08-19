import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feature } from '@app/shared/models/product.model';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';
import { FeatureService } from '@app/core/http/feature/feature.service';
import { DataService } from '@app/core/services/data.service';
import { map } from 'rxjs/operators';
import { PrimeInputFileComponent } from '@app/shared/components/@prime/prime-element/prime-input-file/prime-input-file.component';
import { SingleImagePickerComponent } from '@app/shared/components/single-image-picker/single-image-picker.component';

@Component({
  selector: 'ag-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage implements OnInit {
  @ViewChild(SingleImagePickerComponent, { static: true })
  upload: SingleImagePickerComponent;

  constructor(
    private featureService: FeatureService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    logo: new FormControl(null, Validators.required),
  });
  disabled = true;
  editMode = false;
  features$: Observable<Feature[]>;
  columns: PrimeTableColumn[] = [
    {
      field: 'id',
      header: 'کد',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'title',
      header: 'عنوان',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'logo',
      header: 'تصویر',
      filterType: 'input',
      type: 'image',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];
  urlToShow: string;
  filesToShow;
  ngOnInit(): void {
    this.features$ = this.featureService.get();
  }

  addFeature() {
    this.disabled = false;
    this.editMode = false;
    this.resetForm();
  }

  onActionClick(event) {
    const feature = event.row as Feature;
    if (event.action === 'ویرایش') {
      this.disabled = false;
      this.editMode = true;
      this.resetForm();
      this.form.patchValue({
        id: feature.id,
        title: feature.title,
      });
      this.urlToShow = feature.logo;
    } else if (event.action === 'حذف') {
      this.featureService
        .delete(feature.id)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.featureService
        .patch(this.dataService.getDirtyControls(this.form) as Feature)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    } else {
      this.featureService
        .post(this.form.value as Feature)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onCancel() {
    this.disabled = true;
    this.resetForm();
  }

  resetForm() {
    this.form.reset();
    this.upload.clear();
  }
}
