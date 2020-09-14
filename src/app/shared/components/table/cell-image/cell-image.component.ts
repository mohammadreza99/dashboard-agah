import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { DataService } from '@app/core/services/data.service';

@Component({
  selector: 'ag-cell-image',
  templateUrl: './cell-image.component.html',
  styleUrls: ['./cell-image.component.scss'],
})
export class CellImageComponent implements ICellRendererAngularComp, OnInit {
  constructor(private dataService: DataService) {}

  params: any;
  imageToShow;
  field: string;
  editable = true;
  id: string;
  accept: string;

  agInit(params: any): void {
    this.params = params;
    this.field = params.field;
    this.editable = params.editable;
    this.accept = params.accept || 'image/*';
    this.imageToShow = this.params.node.data[this.field];
  }

  refresh(params: any): boolean {
    return true;
  }

  onSelectImage(event: any) {
    const file: File = event.target.files[0];
    this.createImageFromBlob(file);
    const params = {
      field: this.field,
      event,
      file,
      rowData: this.params.node.data,
    };
    this.params.onSelect(params);
  }

  getImage(imageUrl: string) {
    const headers = { respسonseType: 'blob' };
    return this.dataService.getImage(imageUrl, headers);
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageToShow = reader.result;
    };
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  ngOnInit() {
    this.id = '_' + Math.random().toString(36).substr(2, 9);
  }

  viewFile() {
    window.open(this.imageToShow, '_blank');
  }
}
