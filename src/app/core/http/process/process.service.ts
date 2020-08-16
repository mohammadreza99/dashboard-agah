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

  getById(processId: number): Observable<Process> {
    return this.apiService.get<Process>(`${this.endPoint}/${processId}`);
  }
}
