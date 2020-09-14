import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Director } from '@shared/models/director.model';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class DirectorService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'directors';

  get(): Observable<Director[]> {
    return this.apiService.get<Director[]>(this.endPoint);
  }

  getById(directorId: object): Observable<Director> {
    return this.apiService.get<Director>(`${this.endPoint}/${directorId}`);
  }

  post(director: Director): Observable<Director> {
    const formData = this.apiService.getFormData(director);
    return this.apiService.post<Director>(`${this.endPoint}`, formData);
  }

  patch(director: Director): Observable<Director> {
    const formData = this.apiService.getFormData(director, true);
    return this.apiService.post<Director>(
      `${this.endPoint}/${director.id}`,
      formData
    );
  }

  delete(directorId: object) {
    return this.apiService.delete<Director>(`${this.endPoint}/${directorId}`);
  }
}
