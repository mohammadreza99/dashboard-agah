import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feature } from '@app/shared/models/product.model';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';
import { FeatureService } from '@app/core/http/feature/feature.service';
import { DataService } from '@app/core/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ag-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage implements OnInit {
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
  featureFormData = new FormData();
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
  imageToShow: any[];

  ngOnInit(): void {
    this.features$ = this.featureService.get();
  }

  addFeature() {
    this.disabled = false;
    this.editMode = false;
    this.form.reset();
  }

  onActionClick(event) {
    const feature = event.row as Feature;
    if (event.action === 'ویرایش') {
      this.disabled = false;
      this.editMode = true;
      this.form.setValue({
        id: feature.id,
        title: feature.title,
        logo: feature.logo,
      });
      this.getImage('http://via.placeholder.com/150x150').subscribe(
        (data: any) => {
          this.createImageFromBlob(data);
        }
      );
    } else if (event.action === 'حذف') {
      this.featureService
        .delete(+feature.id)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onSelectImage(imageInput: any) {
    const file: File = imageInput.files[0];
    this.featureFormData.append('logo', file);
  }

  onSubmit() {
    this.featureFormData.append('title', this.form.get('title').value);
    if (this.editMode) {
      this.featureService
        .put(this.featureFormData)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    } else {
      this.featureService
        .post(this.featureFormData)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onCancelClick() {
    this.disabled = true;
    this.form.reset();
  }

  getImage(imageUrl: string) {
    return this.dataService.getImage(imageUrl, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = [reader.result];
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
