import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { JobService } from '@core/http/job/job.service';
import { DataService } from '@core/services/data.service';
import { JobRequest } from '@shared/models';

@Component({
  selector: 'ag-job-requests',
  templateUrl: './job-requests.page.html',
  styleUrls: ['./job-requests.page.scss'],
})
export class JobRequestsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<JobRequest[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'first_name',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'last_name',
      headerName: 'نام خانوادگی',
      editable: false,
    },
    {
      field: 'birthday',
      headerName: 'تاریخ تولد',
      cellRenderer: 'dateRenderer',
      editable: false,
      cellRendererParams: { editable: false },
    },
    {
      field: 'gender',
      headerName: 'جنسیت',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'phone',
      headerName: 'شماره تماس',
      editable: false,
    },
    {
      field: 'address',
      headerName: 'آدرس',
      editable: false,
    },
    {
      field: 'resume',
      headerName: 'فایل رزومه',
      editable: false,
      cellRenderer: 'fileRenderer',
    },
    {
      field: 'confirm',
      headerName: 'وضعیت تایید',
      editable: false,
      cellRenderer: this.statusCellRenderer,
    },
  ];

  constructor(
    private jobRequestService: JobService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.jobRequestService.getRequests();
  }

  statusCellRenderer(params) {
    return booleanCellRenderer(params.data.confirm);
  }

  onActionClick(event) {
    const rowData = event.rowData as JobRequest;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.jobRequestService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'confirm':
        this.jobRequestService.confirmRequest(rowData.id).subscribe(() => {
          this.table.updateTransaction(rowData);
          this.dataService.successfullMessage(this.vcRef);
          this.rowData$ = this.jobRequestService.getRequests();
        });
        break;
    }
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'تایید شده' : 'تایید نشده'}</span></div>`;
}
