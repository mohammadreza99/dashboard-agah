import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Teacher } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'teachers';

  get(): Observable<Teacher[]> {
    return this.apiService
      .get<Teacher[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(teacherId: number | string): Observable<Teacher> {
    return this.apiService.get<Teacher>(`${this.endPoint}/${teacherId}`);
  }

  post(teacher: Teacher): Observable<Teacher> {
    const formData = this.apiService.getFormData(teacher);
    return this.apiService.post<Teacher>(`${this.endPoint}`, formData);
  }

  patch(teacher: Teacher): Observable<Teacher> {
    const formData = this.apiService.getFormData(teacher, true);
    return this.apiService.post<Teacher>(
      `${this.endPoint}/${teacher.id}`,
      formData
    );
  }

  delete(teacherId: number | string) {
    return this.apiService.delete<Teacher>(`${this.endPoint}/${teacherId}`);
  }
}
