import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable, of } from 'rxjs';
import { Contact } from '@app/shared/models/contact.model';
import { ColDef } from 'ag-grid-community';
import { ContactService } from '@app/core/http/contact/contact.service';
import { DataService } from '@app/core/services/data.service';

@Component({
  selector: 'ag-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Contact>;
  columnDefs: ColDef[];

  constructor(
    private contactService: ContactService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.generateColumns();
  }

  async generateColumns() {
    this.rowData$ = this.contactService.get();
    this.columnDefs = [
      {
        field: 'address',
        headerName: 'آدرس',
      },
      {
        field: 'email',
        headerName: 'ایمیل',
      },
      {
        field: 'phone',
        headerName: 'تلفن',
      },
      {
        field: 'latitude',
        headerName: 'latitude',
      },
      {
        field: 'longitude',
        headerName: 'longitude',
      },
    ];
  }

  onCellValueChanged(event) {
    const contact = new Contact();
    const field = event.colDef.field;
    const value = event.data[field];
    contact[field] = value;
    this.contactService.post(contact).subscribe(() => {
      this.table.updateTransaction(contact);
      this.dataService.successfullMessage(this.vcRef);
    });
  }
}
