import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '@app/shared/models/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'comments';

  get(): Observable<Comment[]> {
    return this.apiService
      .get<Comment[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(commentId: string) {
    return this.apiService.get<Comment>(`${this.endPoint}/${commentId}`);
  }

  publish(commentId: object) {
    return this.apiService.patch<Comment>(
      `${this.endPoint}/${commentId}/publish`,
      null
    );
  }

  unpublish(commentId: object) {
    return this.apiService.patch<Comment>(
      `${this.endPoint}/${commentId}/unpublish`,
      null
    );
  }

  delete(commentId: object) {
    return this.apiService.delete<Comment>(`${this.endPoint}/${commentId}`);
  }
}
