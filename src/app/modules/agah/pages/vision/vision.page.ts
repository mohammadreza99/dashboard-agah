import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { VisionService } from '@core/http/vision/vision.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { Vision, DialogFormConfig } from '@shared/models';

@Component({
  selector: 'ag-vision',
  templateUrl: './vision.page.html',
  styleUrls: ['./vision.page.scss'],
})
export class VisionPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Vision>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'text',
      headerName: 'متن',
      editable: false,
    },
  ];

  constructor(
    private visionService: VisionService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.visionService.get();
  }

  addVision() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((vision: Vision) => {
        if (vision) {
          this.visionService.post(vision).subscribe((res) => {
            this.table.addTransaction(vision);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
  }

  formConfig(value?: string): DialogFormConfig[] {
    return [
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'text',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onCellValueChanged(event) {
    const vision = new Vision();
    vision.id = event.data.id;
    if (event.colDef.field !== 'logo') {
      const field = event.colDef.field;
      const value = event.value;
      vision[field] = value;
    }
    this.visionService.post(vision).subscribe(() => {
      this.table.updateTransaction(vision);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const vision = new Vision();
    vision.id = e.rowData.id;
    vision[e.field] = e.file;
    this.visionService.post(vision).subscribe(() => {
      this.table.updateTransaction(vision);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Vision;
    switch (event.action) {
      case 'edit-content':
        this.visionService.get().subscribe((vision) => {
          this.dialogFormService
            .show('ویرایش', this.formConfig(vision[0].text), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                const n = {
                  id: rowData.id,
                  text: result.text,
                } as Vision;
                this.visionService.post(n).subscribe((res) => {
                  this.table.updateTransaction(vision);
                  this.dataService.successfullMessage(this.vcRef);
                });
              }
            });
        });
        break;
    }
  }
}
