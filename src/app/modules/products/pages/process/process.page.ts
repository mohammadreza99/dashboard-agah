import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Process } from '@app/shared/models/product.model';

import { DataService } from '@app/core/services/data.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';
import { ProcessService } from '@app/core/http/process/process.service';

@Component({
  selector: 'ag-process',
  templateUrl: './process.page.html',
  styleUrls: ['./process.page.scss'],
})
export class ProcessPage implements OnInit {
  constructor(
    private processService: ProcessService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
  });
  disabled = true;
  editMode = false;
  urlToShow: string;
  processes$: Observable<Process[]>;
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
      field: 'description',
      header: 'توضیحات',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'image',
      header: 'تصویر',
      filterType: 'input',
      type: 'image',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  ngOnInit(): void {
    this.processes$ = this.processService.get();
  }

  addProcess() {
    this.disabled = false;
    this.editMode = false;
    this.form.reset();
  }

  onActionClick(event) {
    const process = event.row as Process;
    if (event.action === 'ویرایش') {
      this.disabled = false;
      this.editMode = true;
      this.form.patchValue({
        id: process.id,
        title: process.title,
        description: process.description,
      });
      this.urlToShow = process.image;
    } else if (event.action === 'حذف') {
      this.processService
        .delete(process.id)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.processService
        .patch(this.form.value as Process)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    } else {
      this.processService
        .post(this.form.value as Process)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onCancelClick() {
    this.disabled = true;
    this.form.reset();
  }
}
