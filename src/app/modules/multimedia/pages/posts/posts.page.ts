import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectItem } from 'primeng';
import { ColDef } from 'ag-grid-community';

import { PostService } from '@core/http/post/post.service';
import { DataService } from '@core/services/data.service';
import { TableComponent } from '@shared/components/table/table.component';
import { DialogFormService } from '@core/services/dialog-form.service';
import { TagService } from '@core/http/tag/tag.service';
import { Post, DialogFormConfig, Tag } from '@shared/models';

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
      maxWidth: 90,
      editable: false,
    },
    {
      field: 'title',
      headerName: 'عنوان',
      editable: false,
    },
    {
      field: 'summary',
      headerName: 'خلاصه',
      editable: false,
    },
  ];
  availableTags: Tag[];

  constructor(
    private postService: PostService,
    private dataService: DataService,
    private dialogFormService: DialogFormService,
    private tagService: TagService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getRowData();
    this.loadTags();
  }

  getRowData() {
    this.rowData$ = this.postService.get();
  }

  async loadTags() {
    this.availableTags = await this.tagService.get().toPromise();
  }

  addPost() {
    this.dialogFormService
      .show('افزودن', this.formConfig(), '1000px')
      .onClose.subscribe((post: Post) => {
        if (post) {
          this.postService.post(post).subscribe((res) => {
            this.table.addTransaction(post);
            this.dataService.successfullMessage(this.vcRef);
            this.getRowData();
          });
        }
      });
  }

  formConfig(value?: Post): DialogFormConfig[] {
    const postConfig: DialogFormConfig[] = [
      {
        type: 'hidden',
        value: value?.id,
        formControlName: 'id',
      },
      {
        type: 'editor',
        label: 'عنوان',
        labelWidth: 110,
        value: value?.title,
        formControlName: 'title',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'link',
        label: 'لینک کوتاه',
        value: value?.short_link,
        labelWidth: 110,
        formControlName: 'short_link',
        errors: [
          { type: 'required', message: 'این فیلد الزامیست' },
          { type: 'pattern', message: 'لینک وارد شده صحیح نیست' },
        ],
      },
      {
        type: 'text',
        label: 'خلاصه',
        value: value?.summary,
        labelWidth: 110,
        formControlName: 'summary',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'multi-select',
        label: 'تگ ها',
        labelWidth: 110,
        formControlName: 'tags',
        value: value?.tags,
        multiSelectItems: this.availableTags.map((item) => {
          return { value: item.id, label: item.tag };
        }),
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
        value: value?.content,
        formControlName: 'content',
        errors: [{ type: 'required', message: 'این فیلد الزامیست' }],
      },
      {
        type: 'checkbox',
        label: 'جزو مقالات برگزیده باشد',
        value: value?.featured || false,
        labelWidth: 110,
        formControlName: 'featured',
      },
    ];
    if (value) {
      postConfig.splice(5, 1);
    }
    return postConfig;
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
      case 'edit':
        this.postService.getById(rowData.id).subscribe((post) => {
          const p: any = { ...post, tags: post.tags.map((item) => item.id) };
          this.dialogFormService
            .show('ویرایش', this.formConfig(p), '1000px')
            .onClose.subscribe((result: any) => {
              if (result) {
                this.postService.patch(result).subscribe((res) => {
                  this.table.updateTransaction(post);
                  this.dataService.successfullMessage(this.vcRef);
                  this.getRowData();
                });
              }
            });
        });
        break;
    }
  }
}
