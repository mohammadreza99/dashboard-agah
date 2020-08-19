import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Stockholder } from '@shared/models/stockholder.model';

@Injectable({
  providedIn: 'root',
})
export class StockholderService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'stock-holders';

  get(): Observable<Stockholder[]> {
    return this.apiService.get<Stockholder[]>(this.endPoint);
  }

  getById(stockholderId: string | number): Observable<Stockholder> {
    return this.apiService.get<Stockholder>(
      `${this.endPoint}/${stockholderId}`
    );
  }
}
