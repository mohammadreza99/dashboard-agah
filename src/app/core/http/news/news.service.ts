import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { News } from '@shared/models';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'news';

  get(): Observable<News[]> {
    return this.apiService
      .get<News[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(newsId: number | string): Observable<News> {
    return this.apiService.get<News>(`${this.endPoint}/${newsId}`);
  }

  post(news: News): Observable<News> {
    const formData = this.apiService.getFormData(news);
    return this.apiService.post<News>(`${this.endPoint}`, formData);
  }

  patch(news: News): Observable<News> {
    const formData = this.apiService.getFormData(news, true);
    return this.apiService.post<News>(`${this.endPoint}/${news.id}`, formData);
  }

  delete(newsId: number | string) {
    return this.apiService.delete<News>(`${this.endPoint}/${newsId}`);
  }
}
