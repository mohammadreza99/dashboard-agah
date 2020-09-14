import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Course, CourseContent } from '@app/shared/models/education';
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

  getById(courseId: string) {
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

  delete(courseId: object) {
    return this.apiService.delete<Course>(`${this.endPoint}/${courseId}`);
  }

  getContent(courseId: string) {
    return this.apiService
      .get<CourseContent[]>(`${this.endPoint}/${courseId}/contents`)
      .pipe(map((res: any) => res.data));
  }

  postContent(courseId: object, courseContent: CourseContent) {
    const formData = this.apiService.getFormData(courseContent);
    return this.apiService.post<CourseContent>(
      `${this.endPoint}/${courseId}/contents`,
      formData
    );
  }

  patchContent(courseId: object, courseContent: CourseContent) {
    const formData = this.apiService.getFormData(courseContent, true);
    return this.apiService.post<CourseContent>(
      `${this.endPoint}/${courseId}/contents/${courseContent.id}`,
      formData
    );
  }

  deleteContent(courseId: object, courseContentId: object) {
    return this.apiService.delete<Course>(
      `${this.endPoint}/${courseId}/contents/${courseContentId}`
    );
  }
}
