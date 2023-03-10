import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '@core/http/api.service';
import { NewsLetter } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'news-letters';

  get(): Observable<NewsLetter[]> {
    return this.apiService
      .get<NewsLetter[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(newsLetterId: number | string): Observable<NewsLetter> {
    return this.apiService.get<NewsLetter>(`${this.endPoint}/${newsLetterId}`);
  }

  post(newsLetter: NewsLetter): Observable<NewsLetter> {
    const formData = this.apiService.getFormData(newsLetter);
    return this.apiService.post<NewsLetter>(`${this.endPoint}`, formData);
  }

  patch(newsLetter: NewsLetter): Observable<NewsLetter> {
    const formData = this.apiService.getFormData(newsLetter, true);
    return this.apiService.post<NewsLetter>(
      `${this.endPoint}/${newsLetter.id}`,
      formData
    );
  }

  delete(newsLetterId: number | string) {
    return this.apiService.delete<NewsLetter>(
      `${this.endPoint}/${newsLetterId}`
    );
  }
}
