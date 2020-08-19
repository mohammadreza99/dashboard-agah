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

  getById(featureId: string | number): Observable<Feature> {
    return this.apiService.get<Feature>(`${this.endPoint}/${featureId}`);
  }

  post(feature: Feature): Observable<Feature> {
    const formData = this.apiService.getFormData(feature);
    return this.apiService.post<Feature>(`${this.endPoint}`, formData);
  }

  patch(feature: Feature): Observable<Feature> {
    const formData = this.apiService.getFormData(feature);
    return this.apiService.patch<Feature>(
      `${this.endPoint}/${feature.id}`,
      formData
    );
  }

  delete(featureId: string | number) {
    return this.apiService.delete<Feature>(`${this.endPoint}/${featureId}`);
  }
}
