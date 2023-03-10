import { Type } from '@angular/core';
import { DialogFormComponent } from './components/dialog-form/dialog-form.component';
import { TagComponent } from './components/tag/tag.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { PageContainerComponent } from './components/page-container/page-container.component';
import { ContentFormComponent } from './components/content-form/content-form.component';
import { TableComponent } from './components/table/table.component';
import { CellButtonComponent } from './components/table/cell-button/cell-button.component';
import { CellImageComponent } from './components/table/cell-image/cell-image.component';
import { CellDatepickerComponent } from './components/table/cell-datepicker/cell-datepicker.component';
import { CellFileComponent } from './components/table/cell-file/cell-file.component';

export const COMPONENTS: Type<any>[] = [
  DialogFormComponent,
  TagComponent,
  ToolbarComponent,
  TableComponent,
  CellButtonComponent,
  CellImageComponent,
  CellDatepickerComponent,
  CellFileComponent,
  PageContainerComponent,
  ContentFormComponent,
];
