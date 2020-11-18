import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { GalleryItem, DialogFormConfig } from '@shared/models';
import { GalleryService } from '@core/http/gallery/gallery.service';
import { DataService } from '@core/services/data.service';
import { TableComponent } from '@shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { Observable } from 'rxjs';

@Component({
  selector: 'ag-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})
export class GalleryPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<GalleryItem[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
  ];
  showDialog: boolean;
  galleryTitle: string;
  galleryImages: any[];

  constructor(
    private galleryService: GalleryService,
    private dataService: DataService,
    private vdRef: ViewContainerRef,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
  }

  getRowData() {
    this.rowData$ = this.galleryService.get();
  }

  addGallery() {
    this.showDialog = true;
    // this.dialogFormService
    //   .show('افزودن', this.formConfig())
    //   .onClose.subscribe((galleryItem: GalleryItem) => {
    //     if (galleryItem) {
    //       this.galleryService.post(galleryItem).subscribe((res) => {
    //         this.table.addTransaction(galleryItem);
    //         this.dataService.successfullMessage(this.vcRef);
    //         this.getRowData();
    //       });
    //     }
    //   });
  }

  formConfig(): DialogFormConfig[] {
    return [
      {
        type: 'text',
        label: 'عنوان',
        labelWidth: 110,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'multi-image-picker',
        label: 'تصاویر',
        labelWidth: 110,
        formControlName: 'images',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  onActionClick(event) {
    const rowData = event.rowData as GalleryItem;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.galleryService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
    }
  }

  onDeleteClick(item: GalleryItem) {
    this.dataService.deletionConfirm(this.vdRef).then(() => {
      this.galleryService.delete(item.id).subscribe(() => {
        this.dataService.successfullMessage(this.vdRef);
        this.getRowData();
      });
    });
  }

  onSubmitDialogClick() {
    const gallery: GalleryItem = {
      title: this.galleryTitle,
      images: this.galleryImages,
    };
    this.galleryService.post(gallery).subscribe(() => {
      this.dataService.successfullMessage(this.vdRef);
      this.galleryTitle = null;
      this.galleryImages = null;
      this.showDialog = false;
      this.getRowData();
    });
  }

  onEditTitle(item: GalleryItem) {
    const updatedItem = {
      id: item.id,
      title: item.title,
    } as GalleryItem;
    this.galleryService.patch(updatedItem).subscribe(() => {
      this.dataService.successfullMessage(this.vdRef);
    });
  }

  onSelectImage(event) {
    this.galleryImages = [...event];
  }
}
