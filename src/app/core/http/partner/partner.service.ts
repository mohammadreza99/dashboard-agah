import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Partner } from '@shared/models';
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

  getById(partnerId: number | string): Observable<Partner> {
    return this.apiService.get<Partner>(`${this.endPoint}/${partnerId}`);
  }

  post(partner: Partner): Observable<Partner> {
    const formData = this.apiService.getFormData(partner);
    return this.apiService.post<Partner>(`${this.endPoint}`, formData);
  }

  patch(partner: Partner): Observable<Partner> {
    const formData = this.apiService.getFormData(partner, true);
    return this.apiService.post<Partner>(
      `${this.endPoint}/${partner.id}`,
      formData
    );
  }

  delete(partnerId: number | string) {
    return this.apiService.delete<Partner>(`${this.endPoint}/${partnerId}`);
  }
}
