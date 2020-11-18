import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Department } from '@shared/models';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'teams';

  get(): Observable<Department[]> {
    return this.apiService.get<Department[]>(this.endPoint);
  }

  getById(departmentId: number | string): Observable<Department> {
    return this.apiService.get<Department>(`${this.endPoint}/${departmentId}`);
  }

  post(department: Department): Observable<Department> {
    const formData = this.apiService.getFormData(department);
    return this.apiService.post<Department>(`${this.endPoint}`, department);
  }

  patch(department: Department): Observable<Department> {
    const formData = this.apiService.getFormData(department, true);
    return this.apiService.post<Department>(
      `${this.endPoint}/${department.id}`,
      formData
    );
  }

  delete(departmentId: number | string) {
    return this.apiService.delete<Department>(
      `${this.endPoint}/${departmentId}`
    );
  }
}
