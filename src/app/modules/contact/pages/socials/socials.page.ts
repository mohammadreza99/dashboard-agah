import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { SocialNetworkService } from '@core/http/social-network/social-network.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { SocialNetwork, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-socials',
  templateUrl: './socials.page.html',
  styleUrls: ['./socials.page.scss'],
})
export class SocialsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<SocialNetwork[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'key',
      headerName: 'عنوان',
    },
    {
      field: 'value',
      headerName: 'آدرس',
    },
  ];

  constructor(
    private socialNetworkService: SocialNetworkService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.socialNetworkService.get();
  }

  addSocialNetwork() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((socialNetwork: SocialNetwork) => {
        if (socialNetwork) {
          this.socialNetworkService.post(socialNetwork).subscribe((res) => {
            this.table.addTransaction(socialNetwork);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 110,
        formControlName: 'key',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'text',
        label: 'آدرس',
        labelWidth: 110,
        formControlName: 'value',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onCellValueChanged(event) {
    const socialNetwork = new SocialNetwork();
    socialNetwork.id = event.data.id;
    const field = event.colDef.field;
    const value = event.value;
    socialNetwork[field] = value;
    this.socialNetworkService.post(socialNetwork).subscribe(() => {
      this.table.updateTransaction(socialNetwork);
      this.dataService.successfullMessage(this.vcRef);
    });
  }
}
