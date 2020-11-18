import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/http/api.service';
import { HistoryItem } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'histories';

  get(): Observable<HistoryItem[]> {
    return this.apiService
      .get<HistoryItem[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(historyId: number | string): Observable<HistoryItem> {
    return this.apiService.get<HistoryItem>(`${this.endPoint}/${historyId}`);
  }

  post(history: HistoryItem): Observable<HistoryItem> {
    const formData = this.apiService.getFormData(history);
    return this.apiService.post<HistoryItem>(`${this.endPoint}`, formData);
  }

  patch(history: HistoryItem): Observable<HistoryItem> {
    const formData = this.apiService.getFormData(history, true);
    return this.apiService.post<HistoryItem>(
      `${this.endPoint}/${history.id}`,
      formData
    );
  }

  delete(historyId: number | string) {
    return this.apiService.delete<HistoryItem>(`${this.endPoint}/${historyId}`);
  }
}
