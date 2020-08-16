import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Feature } from '@app/shared/models/product.model';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';
import { FeatureService } from '@app/core/http/feature/feature.service';
import { UploadService } from '@app/core/http/upload/upload.service';
import { ImageSnippet } from '@app/shared/models/image-snippet';

@Component({
  selector: 'ag-features',
  templateUrl: './features.page.html',
  styleUrls: ['./features.page.scss'],
})
export class FeaturesPage implements OnInit {
  constructor(
    private featureService: FeatureService,
    private uploadService: UploadService
  ) {}

  form = new FormGroup({
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
      header: 'وبسایت',
      filterType: 'input',
      type: 'image',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  ngOnInit(): void {
    this.features$ = this.featureService.get();
  }

  onSubmit() {
    this.featureService.post(this.form.value).subscribe();
  }

  addFeature() {
    this.disabled = false;
    this.editMode = false;
    this.form.reset();
  }

  onActionClick(event) {
    if (event.action === 'ویرایش') {
    } else if (event.action === 'حذف') {
    }
  }

  onSelectImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    let selectedFile: ImageSnippet;
    reader.addEventListener('load', (event: any) => {
      selectedFile = new ImageSnippet(event.target.result, file);
      this.uploadService.uploadImage(selectedFile.file).subscribe(
        (res) => {},
        (err) => {}
      );
    });
    reader.readAsDataURL(file);
  }
}
