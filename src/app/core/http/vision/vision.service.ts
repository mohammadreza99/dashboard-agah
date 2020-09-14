import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Vision } from '@shared/models/vision.model';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'text?key=vision';

  get(): Observable<Vision> {
    return this.apiService.get<Vision>('text?key=vision');
  }

  post(vision: Vision): Observable<Vision> {
    const formData = this.apiService.getFormData(vision);
    return this.apiService.post<Vision>(`${this.endPoint}`, formData);
  }
}
