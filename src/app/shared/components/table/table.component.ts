import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellButtonComponent } from './cell-button/cell-button.component';
import { ColDef } from 'ag-grid-community';
import { CellImageComponent } from './cell-image/cell-image.component';
import { CellDatepickerComponent } from './cell-datepicker/cell-datepicker.component';
import { CellFileComponent } from './cell-file/cell-file.component';

@Component({
  selector: 'ag-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  public frameworkComponents = {
    buttonRenderer: CellButtonComponent,
    imageRenderer: CellImageComponent,
    dateRenderer: CellDatepickerComponent,
    fileRenderer: CellFileComponent,
  };

  constructor() {}

  @Input() columnDefs: ColDef[];
  @Input() rowData: any;
  @Input() enableFilter: boolean = true;
  @Input() enableSorting: boolean = true;
  @Input() pagination: boolean = false;
  @Input() draggable: boolean = true;
  @Input() paginationPageSize: number;
  @Input() actionsConfig: any[];
  @Input() imagesConfig: any[];
  @Input() objectConfig: any[];
  @Input() multiObjectConfig: any[];
  @Input() defaultColDef: any = {
    flex: 1,
    sortable: true,
    resizable: true,
    filter: true,
    editable: true,
    autoHeight: true,
  };
  @Output() cellValueChanged = new EventEmitter();
  @Output() rowDeleted = new EventEmitter();
  @Output() actionClick = new EventEmitter();
  @Output() imageSelect = new EventEmitter();
  @Output() objectChange = new EventEmitter();
  @Output() multiObjectChange = new EventEmitter();
  @Output() multiObjectRemove = new EventEmitter();
  @Output() rowDragEnter = new EventEmitter();
  @Output() rowDragMove = new EventEmitter();
  @Output() rowDragEnd = new EventEmitter();

  ngOnInit(): void {
    if (this.objectConfig) {
      let mappedList;
      this.objectConfig.forEach((config) => {
        mappedList = objectMapping(config);
        this.columnDefs.push({
          field: config.field + '.' + config.formatValue,
          headerName: config.headerName,
          cellEditor: 'agSelectCellEditor',
          editable: true,
          cellEditorParams: { values: extractValues(mappedList) },
          filterParams: {
            valueFormatter: (params) => {
              return lookupValue(mappedList, params.value);
            },
          },
          valueFormatter: (params) => {
            return lookupValue(mappedList, params.value);
          },
          valueParser: (params) => {
            return lookupKey(mappedList, params.newValue);
          },
          onCellValueChanged: (params) => {
            this.onObjectChange(params);
          },
        });
      });
    }

    if (this.multiObjectConfig) {
      let mappedList;
      this.multiObjectConfig.forEach((config) => {
        mappedList = objectMapping(config);
        this.columnDefs.push({
          field: config.field,
          headerName: config.headerName,
          cellRenderer: 'multiObjectRenderer',
          cellRendererParams: {
            available: config.items,
            selected: config.items,
            fieldToShow: config.formatValue,
            columnField: config.field,
            onRemove: (params) => {
              this.onMultiObjectRemove(params);
            },
          },
          cellEditor: 'agSelectCellEditor',
          editable: true,
          cellEditorParams: { values: extractValues(mappedList) },
          filterParams: {
            valueFormatter: (params) => {
              return lookupValue(mappedList, params.value);
            },
          },
          valueFormatter: (params) => {
            return lookupValue(mappedList, params.value);
          },
          valueParser: (params) => {
            return lookupKey(mappedList, params.newValue);
          },
          onCellValueChanged: (params) => {
            const obj = {};
            obj[params.data[config.field]] = mappedList[params.data.partners];
            this.onMultiObjectChange({ selected: obj, params });
          },
        });
      });
    }

    if (this.imagesConfig) {
      this.imagesConfig.forEach((config) => {
        this.columnDefs.push({
          headerName: config.headerName,
          editable: false,
          sortable: false,
          minWidth: 250,
          maxWidth: 250,
          filter: false,
          cellRenderer: 'imageRenderer',
          cellRendererParams: {
            onSelect: this.onSelectImage.bind(this),
            field: config.field,
            editable: config.editable,
            accept: config.accept,
          },
        });
      });
    }

    if (this.actionsConfig) {
      this.actionsConfig.forEach((action) => {
        this.columnDefs.push({
          headerName: action.headerName,
          editable: false,
          filter: false,
          sortable: false,
          minWidth: 80,
          maxWidth: 80,
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onActionClick.bind(this),
            action: action.action,
            label: action.label,
            icon: action.icon,
            color: action.color,
          },
        });
      });
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onCellValueChanged(event) {
    this.cellValueChanged.emit(event);
  }

  addTransaction(entity: any) {
    this.gridApi.applyTransaction({ add: [entity] });
  }

  deleteTransaction(entity: any) {
    this.gridApi.applyTransaction({ remove: [entity] });
  }

  updateTransaction(entity: any) {
    this.gridApi.applyTransaction({ update: [entity] });
  }

  onActionClick(e: any) {
    this.actionClick.emit(e);
  }

  onSelectImage(e: any) {
    this.imageSelect.emit(e);
  }

  onObjectChange(e: any) {
    this.objectChange.emit(e);
  }

  onMultiObjectChange(e: any) {
    this.multiObjectChange.emit({
      selected: e.selected,
      rowData: e.params.data,
    });
  }

  onMultiObjectRemove(params) {
    this.multiObjectRemove.emit(params);
  }

  onColumnResized(params) {
    params.api.resetRowHeights();
  }
}

function extractValues(mappings) {
  return Object.keys(mappings);
}

function lookupValue(mappings, key) {
  return mappings[key];
}

function lookupKey(mappings, name) {
  var keys = Object.keys(mappings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (mappings[key] === name) {
      return key;
    }
  }
}

function objectMapping(config) {
  const obj = {};
  config.items.forEach((p) => {
    Object.assign(obj, {
      [p[config.formatKey]]: p[config.formatValue],
    });
  });
  return obj;
}
