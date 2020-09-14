import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TableComponent } from '@app/shared/components/table/table.component';
import { Observable } from 'rxjs';
import { CommentService } from '@app/core/http/comment/comment.service';
import { DataService } from '@app/core/services/data.service';
import { Comment } from '@app/shared/models/comment';

@Component({
  selector: 'ag-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Comment[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'key',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'comment',
      headerName: 'متن نظر',
      cellEditor: 'agLargeTextCellEditor',
    },
    {
      field: 'commentable_type',
      headerName: 'مربوط به بخش',
      editable: false,
    },
    {
      field: 'publish',
      headerName: 'وضعیت انتشار',
      editable: false,
      cellRenderer: this.statusCellRenderer,
    },
  ];

  constructor(
    private commentService: CommentService,
    private dataService: DataService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.commentService.get();
  }

  statusCellRenderer(params) {
    return booleanCellRenderer(params.data.publish);
  }

  onActionClick(event) {
    const rowData = event.rowData as Comment;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.commentService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'publish':
        this.commentService.publish(rowData.id).subscribe(() => {
          this.table.updateTransaction(rowData);
          this.dataService.successfullMessage(this.vcRef);
          this.rowData$ = this.commentService.get();
        });
        break;
      case 'unpublish':
        this.commentService.unpublish(rowData.id).subscribe(() => {
          this.table.updateTransaction(rowData);
          this.dataService.successfullMessage(this.vcRef);
          this.rowData$ = this.commentService.get();
        });
        break;
    }
  }
}

function booleanCellRenderer(condtion: any) {
  return `<div class="d-flex"><div style="width:15px;height:15px;border-radius:50%;margin-top:13px;background-color:${
    condtion ? 'green' : 'red'
  }"></div> <span>${condtion ? 'منتشر شده' : 'منتشر نشده'}</span></div>`;
}
