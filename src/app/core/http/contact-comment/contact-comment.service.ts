import { Injectable } from '@angular/core';
import { ContactComment } from '@app/shared/models/contact-comment';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContactCommentService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'contact-comments';

  get(): Observable<ContactComment[]> {
    return this.apiService
      .get<ContactComment[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(contactCommentId: object): Observable<ContactComment> {
    return this.apiService.get<ContactComment>(
      `${this.endPoint}/${contactCommentId}`
    );
  }

  post(contactComment: ContactComment): Observable<ContactComment> {
    const formData = this.apiService.getFormData(contactComment);
    return this.apiService.post<ContactComment>(`${this.endPoint}`, formData);
  }

  delete(contactCommentId: object) {
    return this.apiService.delete<ContactComment>(
      `${this.endPoint}/${contactCommentId}`
    );
  }
}
