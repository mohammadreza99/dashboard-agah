import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { ContactService } from '@core/http/contact/contact.service';
import { DataService } from '@core/services/data.service';

@Component({
  selector: 'ag-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData: any[];
  columnDefs: ColDef[] = [
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

  constructor(
    private contactService: ContactService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.contactService.get().subscribe((res: any) => {
      this.rowData = [res];
    });
  }

  onCellValueChanged(event) {
    delete event.data.created_at;
    delete event.data.updated_at;
    delete event.data.id;
    this.contactService.patch(event.data).subscribe(() => {
      this.table.updateTransaction(event.data);
      this.dataService.successfullMessage(this.vcRef);
    });
  }
}
