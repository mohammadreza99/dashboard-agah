import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Course, CourseContent } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'courses';

  get(): Observable<Course[]> {
    return this.apiService
      .get<Course[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(courseId: string | number) {
    return this.apiService.get<Course>(`${this.endPoint}/${courseId}`);
  }

  post(course: Course): Observable<Course> {
    const formData = this.apiService.getFormData(course);
    return this.apiService.post<Course>(`${this.endPoint}`, formData);
  }

  patch(course: Course): Observable<Course> {
    const formData = this.apiService.getFormData(course, true);
    return this.apiService.post<Course>(
      `${this.endPoint}/${course.id}`,
      formData
    );
  }

  delete(courseId: number | string) {
    return this.apiService.delete<Course>(`${this.endPoint}/${courseId}`);
  }

  getContent(courseId: string | number) {
    return this.apiService
      .get<CourseContent[]>(`${this.endPoint}/${courseId}/contents`)
      .pipe(map((res: any) => res.data));
  }

  postContent(courseId: number | string, courseContent: CourseContent) {
    const formData = this.apiService.getFormData(courseContent);
    return this.apiService.post<CourseContent>(
      `${this.endPoint}/${courseId}/contents`,
      formData
    );
  }

  patchContent(courseId: number | string, courseContent: CourseContent) {
    const formData = this.apiService.getFormData(courseContent, true);
    return this.apiService.post<CourseContent>(
      `${this.endPoint}/${courseId}/contents/${courseContent.id}`,
      formData
    );
  }

  deleteContent(courseId: number | string, courseContentId: number | string) {
    return this.apiService.delete<Course>(
      `${this.endPoint}/${courseId}/contents/${courseContentId}`
    );
  }
}
