import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '@app/core/http/post/post.service';
import { DataService } from '@app/core/services/data.service';
import { Post } from '@app/shared/models/post.model';
import { TableComponent } from '@app/shared/components/table/table.component';
import { ColDef } from 'ag-grid-community';
import { DialogFormService } from '@app/core/services/dialog-form.service';
import { DialogFormConfig } from '@app/shared/models/dialog-form-config';

@Component({
  selector: 'ag-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  @ViewChild(TableComponent, { static: false }) table: TableComponent;

  rowData$: Observable<Post[]>;
  columnDefs: ColDef[] = [
    {
      field: 'id',
      headerName: 'شناسه',
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
    },
    {
      field: 'summary',
      headerName: 'خلاصه',
      cellEditor: 'agLargeTextCellEditor',
    },
  ];

  constructor(
    private postService: PostService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.rowData$ = this.postService.get();
  }

  addPost() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((post: Post) => {
        if (post) {
          this.postService.post(post).subscribe((res) => {
            this.table.addTransaction(post);
            this.dataService.successfullMessage(this.vcRef);
          });
        }
      });
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
        type: 'textarea',
        label: 'خلاصه',
        labelWidth: 110,
        formControlName: 'summary',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'image-picker',
        label: 'عکس',
        labelWidth: 110,
        formControlName: 'image',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
    ];
  }

  editFormConfig(value: string): DialogFormConfig[] {
    return [
      {
        type: 'editor',
        label: 'متن',
        labelWidth: 110,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
        value: value,
      },
    ];
  }

  onCellValueChanged(event) {
    const post = new Post();
    post.id = event.data.id;
    if (event.colDef.field !== 'image') {
      const field = event.colDef.field;
      const value = event.value;
      post[field] = value;
    }
    this.postService.patch(post).subscribe(() => {
      this.table.updateTransaction(post);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onImageSelect(e) {
    const post = new Post();
    post.id = e.rowData.id;
    post[e.field] = e.file;
    this.postService.patch(post).subscribe(() => {
      this.table.updateTransaction(post);
      this.dataService.successfullMessage(this.vcRef);
    });
  }

  onActionClick(event) {
    const rowData = event.rowData as Post;
    switch (event.action) {
      case 'delete':
        this.dataService.deletionConfirm(this.vcRef).then(() => {
          this.postService.delete(rowData.id).subscribe(() => {
            this.table.deleteTransaction(rowData);
            this.dataService.successfullMessage(this.vcRef);
          });
        });
        break;
      case 'edit-content':
        this.postService.getById(rowData.id).subscribe((post) => {
          this.dialogFormService
            .show('ویرایش', this.editFormConfig(post.content), '1000px')
            .onClose.subscribe((result) => {
              if (result) {
                const n = {
                  id: rowData.id,
                  content: result.content,
                } as Post;
                this.postService.patch(n).subscribe((res) => {
                  this.table.updateTransaction(post);
                  this.dataService.successfullMessage(this.vcRef);
                });
              }
            });
        });
        break;
    }
  }
}
