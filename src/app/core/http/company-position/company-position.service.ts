import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/http/api.service';
import { CompanyPosition } from '@shared/models/company-position.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyPositionService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'company-positions';

  get(): Observable<CompanyPosition[]> {
    return this.apiService
      .get<CompanyPosition[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(positionId: string | number): Observable<CompanyPosition> {
    return this.apiService.get<CompanyPosition>(
      `${this.endPoint}/${positionId}`
    );
  }
}
