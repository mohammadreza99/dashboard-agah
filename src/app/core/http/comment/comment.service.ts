import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentItem } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'comments';

  get(): Observable<CommentItem[]> {
    return this.apiService
      .get<CommentItem[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(commentId: string | number) {
    return this.apiService.get<CommentItem>(`${this.endPoint}/${commentId}`);
  }

  publish(commentId: number | string) {
    return this.apiService.patch<CommentItem>(
      `${this.endPoint}/${commentId}/publish`,
      null
    );
  }

  unpublish(commentId: number | string) {
    return this.apiService.patch<CommentItem>(
      `${this.endPoint}/${commentId}/unpublish`,
      null
    );
  }

  delete(commentId: number | string) {
    return this.apiService.delete<CommentItem>(`${this.endPoint}/${commentId}`);
  }
}
