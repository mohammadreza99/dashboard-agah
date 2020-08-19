import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Vision } from '@shared/models/vision.model';

@Injectable({
  providedIn: 'root',
})
export class VisionService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'vision-bodies';

  get(): Observable<Vision> {
    return this.apiService.get<Vision>(this.endPoint);
  }

  getById(visionId: string | number): Observable<Vision> {
    return this.apiService.get<Vision>(`${this.endPoint}/${visionId}`);
  }
}
