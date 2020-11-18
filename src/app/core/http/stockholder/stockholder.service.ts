import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Stockholder } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class StockholderService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'stock-holders';

  get(): Observable<Stockholder[]> {
    return this.apiService.get<Stockholder[]>(this.endPoint);
  }

  getById(stockholderId: number | string): Observable<Stockholder> {
    return this.apiService.get<Stockholder>(
      `${this.endPoint}/${stockholderId}`
    );
  }

  post(stockholder: Stockholder): Observable<Stockholder> {
    const formData = this.apiService.getFormData(stockholder);
    return this.apiService.post<Stockholder>(`${this.endPoint}`, formData);
  }

  patch(stockholder: Stockholder): Observable<Stockholder> {
    const formData = this.apiService.getFormData(stockholder, true);
    return this.apiService.post<Stockholder>(
      `${this.endPoint}/${stockholder.id}`,
      formData
    );
  }

  delete(stockholderId: number | string) {
    return this.apiService.delete<Stockholder>(
      `${this.endPoint}/${stockholderId}`
    );
  }
}
