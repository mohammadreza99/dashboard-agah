import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { NewsLetter } from '@shared/models/news-letter.model';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'news-letter';

  get(): Observable<NewsLetter[]> {
    return this.apiService
      .get<NewsLetter[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(newsLetterId: string | number): Observable<NewsLetter> {
    return this.apiService.get<NewsLetter>(`${this.endPoint}/${newsLetterId}`);
  }
}
