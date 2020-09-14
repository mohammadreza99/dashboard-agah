import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/http/api.service';
import { History } from '@shared/models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'histories';

  get(): Observable<History[]> {
    return this.apiService
      .get<History[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(historyId: object): Observable<History> {
    return this.apiService.get<History>(`${this.endPoint}/${historyId}`);
  }

  post(history: History): Observable<History> {
    const formData = this.apiService.getFormData(history);
    return this.apiService.post<History>(`${this.endPoint}`, formData);
  }

  patch(history: History): Observable<History> {
    const formData = this.apiService.getFormData(history, true);
    return this.apiService.post<History>(
      `${this.endPoint}/${history.id}`,
      formData
    );
  }

  delete(historyId: object) {
    return this.apiService.delete<History>(`${this.endPoint}/${historyId}`);
  }
}
