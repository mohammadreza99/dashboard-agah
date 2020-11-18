import { Injectable } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng';

import { DialogFormConfig } from '@shared/models';
import { DialogFormComponent } from '@shared/components/dialog-form/dialog-form.component';

@Injectable({
  providedIn: 'root',
})
export class DialogFormService {
  constructor(private dialogService: DialogService) {}
  show(
    header: string,
    config: DialogFormConfig[],
    width: string = '600px'
  ): DynamicDialogRef {
    return this.dialogService.open(DialogFormComponent, {
      header: header,
      data: config,
      width: width,
    });
  }
}
