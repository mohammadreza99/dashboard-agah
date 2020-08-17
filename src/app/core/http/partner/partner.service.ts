import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Partner } from '@shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'partners';

  get(): Observable<Partner[]> {
    return this.apiService
      .get<Partner[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(partnerId: number): Observable<Partner> {
    return this.apiService.get<Partner>(`${this.endPoint}/${partnerId}`);
  }

  post(partner: Partner): Observable<Partner> {
    return this.apiService.post<Partner>(`${this.endPoint}`, partner);
  }

  put(partner: Partner): Observable<Partner> {
    return this.apiService.post<Partner>(`${this.endPoint}/${partner.id}`, {
      ...partner,
      _method: 'PATCH',
    });
  }

  delete(partnerId: number) {
    return this.apiService.delete<Partner>(`${this.endPoint}/${partnerId}`);
  }
}
