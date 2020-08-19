import { Component, OnInit } from '@angular/core';
import { PostService } from '@app/core/http/post/post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '@app/shared/models/post.model';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'ag-posts-list',
  templateUrl: './posts-list.page.html',
  styleUrls: ['./posts-list.page.scss'],
})
export class PostsListPage implements OnInit {
  constructor(private postService: PostService, private router: Router) {}

  posts$: Observable<Post[]>;
  columns: PrimeTableColumn[] = [
    {
      field: 'id',
      header: 'کد',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'title',
      header: 'عنوان',
      filterType: 'input',
      type: 'string',
    },
    {
      field: 'created_date',
      header: 'تاریخ',
      type: 'moment',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  ngOnInit(): void {
    this.posts$ = this.postService.get();
  }

  onActionClick(event) {
    if (event.action === 'ویرایش') {
      this.router.navigate(['/dashboard/post/edit', event.row.id]);
    } else if (event.action === 'حذف') {
    }
  }
}
