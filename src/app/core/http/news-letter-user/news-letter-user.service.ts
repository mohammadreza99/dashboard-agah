import { Injectable } from '@angular/core';

import { ApiService } from '@core/http/api.service';
import { Observable } from 'rxjs';
import { NewsLetterUser } from '@app/shared/models/news-letter.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterUserService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'news-letter-users';

  get(): Observable<NewsLetterUser[]> {
    return this.apiService
      .get<NewsLetterUser[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(newsLetterUserId: object): Observable<NewsLetterUser> {
    return this.apiService.get<NewsLetterUser>(
      `${this.endPoint}/${newsLetterUserId}`
    );
  }

  post(newsLetterUser: NewsLetterUser): Observable<NewsLetterUser> {
    const formData = this.apiService.getFormData(newsLetterUser);
    return this.apiService.post<NewsLetterUser>(`${this.endPoint}`, formData);
  }

  delete(newsLetterUserId: object) {
    return this.apiService.delete<NewsLetterUser>(
      `${this.endPoint}/${newsLetterUserId}`
    );
  }
}
