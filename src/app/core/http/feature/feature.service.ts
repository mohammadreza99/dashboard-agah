import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Feature } from '@app/shared/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'features';

  get(): Observable<Feature[]> {
    return this.apiService
      .get<Feature[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(featureId: number): Observable<Feature> {
    return this.apiService.get<Feature>(`${this.endPoint}/${featureId}`);
  }

  post(feature: FormData): Observable<Feature> {
    return this.apiService.post<Feature>(`${this.endPoint}`, feature);
  }

  put(feature: FormData): Observable<Feature> {
    return this.apiService.post<Feature>(
      `${this.endPoint}/${feature.get('id')}`,
      {
        ...feature,
        _method: 'PATCH',
      }
    );
  }

  delete(featureId: number) {
    return this.apiService.delete<Feature>(`${this.endPoint}/${featureId}`);
  }
}
