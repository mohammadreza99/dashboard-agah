import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { DialogFormService } from 'src/app/service/dialog-form.service';
import { ExtraFieldGroup } from 'src/app/model/product.model';
import { PrimeTableColumn } from 'src/app/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from 'src/app/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'product-extra-field-group-list-page',
  templateUrl: './product-extra-field-group-list-page.html',
  styleUrls: ['./product-extra-field-group-list-page.scss'],
})
export class ProductExtraFieldGroupListPage implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private dialogFormService: DialogFormService
  ) {}

  extraFieldGroups: ExtraFieldGroup[] = [];
  columns: PrimeTableColumn[] = [
    { field: 'label', header: 'گروه', type: 'string' },
  ];
  actions: PrimeTableAction[] = [
    {
      tooltip: 'ویرایش مشخصه ها',
      icon: 'fas fa-edit',
      color: 'info',
    },
    ...this.dataService.generalActions,
  ];

  ngOnInit() {
    this.loadExtraFieldGroups();
  }

  loadExtraFieldGroups() {
    this.dataService.getExtraFieldGroups().subscribe((response) => {
      this.extraFieldGroups = response.result;
    });
  }

  onAddExtraFieldGroupClick() {
    this.dialogFormService
      .show('افزودن گروه جدید', [
        {
          type: 'text',
          label: 'عنوان گروه',
          labelWidth: 80,
          errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
          formControlName: 'label',
        },
      ])
      .onClose.subscribe((extraFieldGroup) => {
        this.dataService.addExtraFieldGroup(extraFieldGroup).subscribe();
        this.loadExtraFieldGroups();
      });
  }

  onActionClick(event) {
    if (event.action == 'ویرایش') {
      this.dialogFormService
        .show('ویرایش نام گروه', [
          {
            type: 'hidden',
            formControlName: 'id',
            value: event.row.id,
          },
          {
            type: 'text',
            label: 'عنوان گروه',
            labelWidth: 80,
            errors: [{ type: 'required', message: 'این فیلد الزامی است.' }],
            formControlName: 'label',
            value: event.row.label,
          },
        ])
        .onClose.subscribe((extraFieldGroup: ExtraFieldGroup) => {
          if (extraFieldGroup != null) {
            this.dataService.updateExtraFieldGroup(extraFieldGroup).subscribe();
          }
        });
    } else if (event.action == 'ویرایش مشخصه ها') {
      this.router.navigate(['/product/extra-field/list'], {
        queryParams: { groupId: event.row.id, groupLabel: event.row.label },
      });
    }
  }
}
