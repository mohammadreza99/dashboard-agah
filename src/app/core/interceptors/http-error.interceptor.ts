import {
  Injectable,
  ComponentFactoryResolver,
  ViewContainerRef,
} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          const errorMessage = `Code: ${error.status}\nERROR Message: ${error.message}`;
          return throwError(errorMessage);
        }
      }),
    );
  }
}
