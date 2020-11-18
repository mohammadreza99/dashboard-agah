import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Tag, DialogFormConfig } from '@shared/models';
import { TagService } from '@core/http/tag/tag.service';
import { DataService } from '@core/services/data.service';
import { DialogFormService } from '@core/services/dialog-form.service';
import { TableComponent } from '@shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'ag-tags',
  templateUrl: './tags.page.html',
  styleUrls: ['./tags.page.scss'],
})
export class TagsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Tag[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'tag',
      headerName: 'عنوان',
      editable: false,
    },
  ];

  constructor(
    private tagService: TagService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.tagService.get();
  }

  addTag() {
    this.dialogFormService
      .show('افزودن', this.formConfig())
      .onClose.subscribe((tag: Tag) => {
        if (tag) {
          this.tagService.post(tag).subscribe((res) => {
            this.table.addTransaction(tag);
            this.dataService.successfullMessage(this.vcRef);
            this.getRowData();
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
        formControlName: 'tag',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as Tag;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.tagService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }
}
