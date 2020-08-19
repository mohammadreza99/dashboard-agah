import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NewsService } from '@app/core/http/news/news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '@app/core/services/data.service';
import { News } from '@app/shared/models/news.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ag-news-modify',
  templateUrl: './news-modify.page.html',
  styleUrls: ['./news-modify.page.scss'],
})
export class NewsModifyPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vcRef: ViewContainerRef,
    private dataService: DataService,
    private newsService: NewsService
  ) {}

  urlToShow: string;
  news: News;
  pageTitle = 'افزودن مطلب';
  editMode = false;
  form = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(null, Validators.required),
    summary: new FormControl(null, Validators.required),
    image: new FormControl(null, Validators.required),
    content: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.newsService.getById(id).subscribe((news) => {
        this.news = news;
        this.pageTitle = this.news.title;
        this.form.patchValue({
          id: this.news.id,
          title: this.news.title,
          content: this.news.content,
          summary: this.news.summary,
        });
        this.urlToShow = this.news.image;
      });
    } else {
      this.editMode = false;
    }
  }

  onSubmit() {
    if (this.editMode) {
      this.newsService
        .patch(this.dataService.getDirtyControls(this.form) as News)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    } else {
      this.newsService
        .post(this.form.value as News)
        .subscribe((res) => this.dataService.successfullMessage(this.vcRef));
    }
  }

  onCancelClick() {
    this.dataService.cancellationConfirm(this.vcRef).then((accept) => {
      this.router.navigate(['/dashboard/news/list']);
    });
  }
}
