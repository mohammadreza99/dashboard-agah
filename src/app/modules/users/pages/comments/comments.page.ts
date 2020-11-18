import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { TableComponent } from '@shared/components/table/table.component';
import { Observable } from 'rxjs';
import { DataService } from '@core/services/data.service';
import { CommentService } from '@core/http/comment/comment.service';
import { CommentItem } from '@shared/models';

@Component({
  selector: 'ag-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<CommentItem[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'user.name',
      headerName: 'نام',
      editable: false,
    },
    {
      field: 'user.email',
      headerName: 'ایمیل',
      editable: false,
    },
    {
      field: 'comment',
      headerName: 'متن نظر',
      editable: false,
    },
    {
      field: 'commentable_type',
      headerName: 'مربوط به بخش',
      editable: false,
      cellRenderer: this.commentTypeCellRenderer,
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

  commentTypeCellRenderer(params) {
    return commentTypeCellRenderer(params.data);
  }

  statusCellRenderer(params) {
    return booleanCellRenderer(params.data.publish);
  }

  onActionClick(event) {
    const rowData = event.rowData as CommentItem;
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
  }"></div> <span> ${condtion ? ' منتشر شده ' : ' منتشر نشده '} </span></div>`;
}

function commentTypeCellRenderer(params) {
  const commentType = params.commentable_type.split('App\\Entities\\')[1];
  switch (commentType) {
    case 'Comment':
      return `${commentType} - در پاسخ به ${params.comment_replay_id}`;
    default:
      return `${commentType}`;
  }
}
