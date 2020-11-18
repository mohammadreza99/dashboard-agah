import { Injectable } from '@angular/core';
import { Tag } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'tags';

  get(): Observable<Tag[]> {
    return this.apiService.get<Tag[]>(this.endPoint);
  }

  getById(tagId: number | string): Observable<Tag> {
    return this.apiService.get<Tag>(`${this.endPoint}/${tagId}`);
  }

  post(tag: Tag): Observable<Tag> {
    const formData = this.apiService.getFormData(tag);
    return this.apiService.post<Tag>(`${this.endPoint}`, formData);
  }

  delete(tagId: number | string) {
    return this.apiService.delete<Tag>(`${this.endPoint}/${tagId}`);
  }
}
