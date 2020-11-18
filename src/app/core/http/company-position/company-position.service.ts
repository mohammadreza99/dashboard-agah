import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { CompanyPosition } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CompanyPositionService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'company-positions';

  get(): Observable<CompanyPosition[]> {
    return this.apiService.get<CompanyPosition[]>(this.endPoint);
  }

  getById(positionId: number | string): Observable<CompanyPosition> {
    return this.apiService.get<CompanyPosition>(
      `${this.endPoint}/${positionId}`
    );
  }

  post(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    const formData = this.apiService.getFormData(companyPosition);
    return this.apiService.post<CompanyPosition>(`${this.endPoint}`, formData);
  }

  patch(companyPosition: CompanyPosition): Observable<CompanyPosition> {
    const formData = this.apiService.getFormData(companyPosition, true);
    return this.apiService.post<CompanyPosition>(
      `${this.endPoint}/${companyPosition.id}`,
      formData
    );
  }

  delete(companyPositionId: number | string) {
    return this.apiService.delete<CompanyPosition>(
      `${this.endPoint}/${companyPositionId}`
    );
  }
}
