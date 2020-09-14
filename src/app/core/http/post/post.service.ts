import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post } from '@shared/models/post.model';
import { ApiService } from '@core/http/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'posts';

  get(): Observable<Post[]> {
    return this.apiService
      .get<Post[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(postId: object): Observable<Post> {
    return this.apiService.get<Post>(`${this.endPoint}/${postId}`);
  }

  post(post: Post): Observable<Post> {
    const formData = this.apiService.getFormData(post);
    return this.apiService.post<Post>(`${this.endPoint}`, post);
  }

  patch(post: Post): Observable<Post> {
    const formData = this.apiService.getFormData(post, true);
    return this.apiService.post<Post>(`${this.endPoint}/${post.id}`, formData);
  }

  delete(postId: object) {
    return this.apiService.delete<Post>(`${this.endPoint}/${postId}`);
  }
}
