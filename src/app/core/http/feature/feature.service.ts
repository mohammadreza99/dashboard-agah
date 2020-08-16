import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Feature } from '@app/shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'features';

  get(): Observable<Feature[]> {
    return this.apiService.get<Feature[]>(this.endPoint);
  }

  getById(featureId: number): Observable<Feature> {
    return this.apiService.get<Feature>(`${this.endPoint}/${featureId}`);
  }

  post(feature: Feature): Observable<Feature> {
    return this.apiService.post<Feature>(`${this.endPoint}`, feature);
  }
}
