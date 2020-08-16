import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.getToken());
      const clonedRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authService.getToken()
        ),
      });
      return next.handle(clonedRequest);
    } else {
      return next.handle(request);
    }
  }
}
