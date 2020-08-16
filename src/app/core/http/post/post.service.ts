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

  getById(postId: SVGAnimatedString): Observable<Post> {
    return this.apiService.get<Post>(`${this.endPoint}/${postId}`);
  }
}
