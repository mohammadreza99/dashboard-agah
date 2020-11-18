import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { UserSelect, UserInsert } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'users';

  get(): Observable<UserSelect[]> {
    return this.apiService
      .get<UserSelect[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  post(user: UserInsert): Observable<UserInsert> {
    const formData = this.apiService.getFormData(user);
    return this.apiService.post<UserInsert>(`${this.endPoint}`, formData);
  }
}
