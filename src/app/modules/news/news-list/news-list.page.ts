import { Component, OnInit } from '@angular/core';
import { NewsService } from '@app/core/http/news/news.service';
import { News } from '@app/shared/models/news.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PrimeTableColumn } from '@app/shared/components/@prime/prime-model/prime-table-column.model';
import { PrimeTableAction } from '@app/shared/components/@prime/prime-model/prime-table-action.model';

@Component({
  selector: 'ag-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage implements OnInit {
  constructor(private newsService: NewsService, private router: Router) {}

  news$: Observable<News[]>;
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
    this.news$ = this.newsService.get();
  }

  onActionClick(event) {
    if (event.action === 'ویرایش') {
      this.router.navigate(['/dashboard/news/edit', event.row.id]);
    } else if (event.action === 'حذف') {
    }
  }
}
