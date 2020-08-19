import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { PartnerService } from '@app/core/http/partner/partner.service';
import { Partner } from '@app/shared/models/product.model';
import { DataService } from '@app/core/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'ag-partners',
  templateUrl: './partners.page.html',
  styleUrls: ['./partners.page.scss'],
})
export class PartnersPage implements OnInit {
  constructor(
    private partnerService: PartnerService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    logo: new FormControl(null, Validators.required),
  });
  disabled = true;
  urlToShow: string;
  editMode = false;
  partners$: Observable<Partner[]>;
  columns: PrimeTableColumn[] = [
    {
      field: 'id',
      header: 'کد',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'name',
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

  ngOnInit(): void {
    this.partners$ = this.partnerService.get();
  }

  addFeature() {
    this.disabled = false;
    this.editMode = false;
    this.form.reset();
  }

  onActionClick(event) {
    const partner = event.row as Partner;
    if (event.action === 'ویرایش') {
      this.disabled = false;
      this.editMode = true;
      this.form.patchValue({
        id: partner.id,
        name: partner.name,
      });
      this.urlToShow = partner.logo;
    } else if (event.action === 'حذف') {
      this.partnerService
        .delete(partner.id)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.partnerService
        .patch(this.form.value as Partner)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    } else {
      this.partnerService
        .post(this.form.value as Partner)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onCancelClick() {
    this.disabled = true;
    this.form.reset();
  }
}
