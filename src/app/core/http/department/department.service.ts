import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Department } from '@shared/models/department.model';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'visions';

  get(): Observable<Department[]> {
    return this.apiService.get<Department[]>(this.endPoint);
  }

  getById(departmentId: number): Observable<Department> {
    return this.apiService.get<Department>(`${this.endPoint}/${departmentId}`);
  }
}
