import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { UserLogin } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'auth/login';

  login(user: UserLogin): Observable<UserLogin> {
    return this.apiService.post<UserLogin>(`${this.endPoint}`, user);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }
}
