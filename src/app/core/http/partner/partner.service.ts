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

  getById(partnerId: string | number): Observable<Partner> {
    return this.apiService.get<Partner>(`${this.endPoint}/${partnerId}`);
  }

  post(partner: Partner): Observable<Partner> {
    const formData = this.apiService.getFormData(partner);
    return this.apiService.post<Partner>(`${this.endPoint}`, formData);
  }

  patch(partner: Partner): Observable<Partner> {
    const formData = this.apiService.getFormData(partner);
    return this.apiService.patch<Partner>(
      `${this.endPoint}/${partner.id}`,
      formData
    );
  }

  delete(partnerId: string | number) {
    return this.apiService.delete<Partner>(`${this.endPoint}/${partnerId}`);
  }
}
