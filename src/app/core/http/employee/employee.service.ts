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

  getById(employeeId: number): Observable<Employee> {
    return this.apiService.get<Employee>(`${this.endPoint}/${employeeId}`);
  }
}
