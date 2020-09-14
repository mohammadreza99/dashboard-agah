import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ag-cell-file',
  templateUrl: './cell-file.component.html',
  styleUrls: ['./cell-file.component.scss'],
})
export class CellFileComponent implements ICellRendererAngularComp {
  constructor() {}
  fileAddress: string;

  agInit(params): void {
    this.fileAddress = params.node.data[params.colDef.field];
  }

  refresh(params?: any): boolean {
    return true;
  }

  viewFile() {
    window.open(this.fileAddress, '_blank');
  }
}
