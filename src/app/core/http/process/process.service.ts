import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/http/api.service';
import { Process } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'processes';

  get(): Observable<Process[]> {
    return this.apiService
      .get<Process[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(processId: object): Observable<Process> {
    return this.apiService.get<Process>(`${this.endPoint}/${processId}`);
  }

  post(process: Process): Observable<Process> {
    const formData = this.apiService.getFormData(process);
    return this.apiService.post<Process>(`${this.endPoint}`, formData);
  }

  patch(process: Process): Observable<Process> {
    const formData = this.apiService.getFormData(process, true);
    return this.apiService.post<Process>(
      `${this.endPoint}/${process.id}`,
      formData
    );
  }

  delete(processId: object) {
    return this.apiService.delete<Process>(`${this.endPoint}/${processId}`);
  }
}
