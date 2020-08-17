import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '@app/shared/models/post.model';
import { News } from '@app/shared/models/news.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';
import { NewsService } from '@app/core/http/news/news.service';
import { PostService } from '@app/core/http/post/post.service';
import { DataService } from '@app/core/services/data.service';

@Component({
  selector: 'ag-contents',
  templateUrl: './contents.page.html',
  styleUrls: ['./contents.page.scss'],
})
export class ContentsPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vcRef: ViewContainerRef,
    private newsService: NewsService,
    private postService: PostService,
    private dataService: DataService
  ) {}

  contents$: Observable<Post[] | News[]>;
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
      field: 'image',
      header: 'تصویر',
      filterType: 'input',
      type: 'image',
    },
    {
      field: 'user.name',
      header: 'نویسنده',
      filterType: 'input',
      type: 'string',
    },
  ];
  actions: PrimeTableAction[] = [
    { tooltip: 'ویرایش', icon: 'fas fa-pencil', color: 'info' },
  ];

  onActionClick(event) {
    const feature = event.row as Post | News;
    if (event.action === 'ویرایش') {
    } else if (event.action === 'حذف') {
      this.postService
        .delete(+feature.id)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  addContent() {}
  ngOnInit(): void {}
}
