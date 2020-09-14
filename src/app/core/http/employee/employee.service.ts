import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Employee } from '@shared/models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'employees';

  get(): Observable<Employee[]> {
    return this.apiService.get<Employee[]>(this.endPoint);
  }

  getById(employeeId: object): Observable<Employee> {
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

  delete(employeeId: object) {
    return this.apiService.delete<Employee>(`${this.endPoint}/${employeeId}`);
  }
}
