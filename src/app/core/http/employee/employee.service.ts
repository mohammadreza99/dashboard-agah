import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Employee } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'employees';

  get(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(this.endPoint);
  }

  getById(employeeId: number | string): Observable<Employee> {
    return this.apiService.get<Employee>(`${this.endPoint}/${employeeId}`);
  }

  post(employee: Employee): Observable<Employee> {
    const formData = this.apiService.getFormData(employee);
    return this.apiService.post<Employee>(`${this.endPoint}`, formData);
  }

  patch(employee: Employee): Observable<Employee> {
    const formData = this.apiService.getFormData(employee, true);
    return this.apiService.post<Employee>(
      `${this.endPoint}/${employee.id}`,
      formData
    );
  }

  delete(employeeId: number | string) {
    return this.apiService.delete<Employee>(`${this.endPoint}/${employeeId}`);
  }
}
