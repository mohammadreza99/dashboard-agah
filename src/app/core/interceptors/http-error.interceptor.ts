import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const clonedReq = request.clone({
      headers: new HttpHeaders({
        'Accept-Language': localStorage.getItem('lang'),
      }),
    });
    return next.handle(clonedReq).pipe(
      catchError((error: any) => {
        if (error) {
          for (const key in error.error?.errors) {
            if (
              Object.prototype.hasOwnProperty.call(error.error?.errors, key)
            ) {
              const element = error.error?.errors[key];
              this.errorService.storeError({
                title: key,
                message: element,
              });
            }
          }
          const errorMessage = `Code: ${error.status}\nERROR Message: ${error.message}`;
          this.errorService.storeError(this.getErrorMessage(error.status));
          return throwError(errorMessage);
        }
      })
    );
  }
  getErrorMessage(code: number) {
    switch (code) {
      case 400: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست صحیح نمی باشد و قابل پردازش نیست',
        };
      }
      case 401: {
        return {
          title: `خطای ${code}`,
          message: 'دوباره وارد سیستم شوید',
        };
      }
      case 403: {
        return {
          title: `خطای ${code}`,
          message: 'اجرای درخواست مورد نظر برای شما امکان ندارد',
        };
      }
      case 404: {
        return {
          title: `خطای ${code}`,
          message: 'درخواست مورد نظر وجود ندارد',
        };
      }
      case 405: {
        return {
          title: `خطای ${code}`,
          message: 'متد استفاده شده برای درخواست مجاز نیست',
        };
      }
      case 422: {
        return {
          title: `خطای ${code}`,
          message: 'خطا در پردازش فیلدها',
        };
      }
      case 500: {
        return {
          title: `خطای ${code}`,
          message: 'خطا سمت سرور رخ داده است',
        };
      }
      default: {
        return {
          title: `خطا`,
          message: 'خطای ناشناس، امکان ارتباط با سرور وجود ندارد',
        };
      }
    }
  }
}
