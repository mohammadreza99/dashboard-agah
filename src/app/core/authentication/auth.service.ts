import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Constants } from '@core/config/constants';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private apiService: ApiService, private constants: Constants) {}

  private tokenSubject = new BehaviorSubject<string>(null);
  private readonly endPoint = 'auth/login';

  login(user: User): Observable<User> {
    return this.apiService.post<User>(`${this.endPoint}`, user);
  }

  saveToken(token: string) {
    this.tokenSubject.next(token);
  }

  getToken(): string {
    return this.tokenSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getToken() ? true : false;
  }
}
