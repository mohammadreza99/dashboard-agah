import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Constants } from '@core/config/constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient, private constants: Constants) {}

  private baseUrl = this.constants.API_URL;
  private headers = new HttpHeaders({
    // TODO
    'Accept-Language': 'en',
  });

  get<T>(endpoint: string, options?: any) {
    if (!options) {
      options = {};
    }
    options.headers = this.headers;

    return this.http
      .get<T>(this.baseUrl + endpoint, options)
      .pipe(map((res: any) => res.data as T));
  }

  post<T>(endpoint: string, data: any, options?: any) {
    return this.http
      .post<T>(this.baseUrl + endpoint, data, options)
      .pipe(map((res: any) => res.data as T));
  }

  put<T>(endpoint: string, data: any, options?: any) {
    return this.http
      .put(this.baseUrl + endpoint, data, options)
      .pipe(map((res: any) => res.data as T));
  }

  delete<T>(endpoint: string, options?: any) {
    return this.http
      .delete<T>(this.baseUrl + endpoint, options)
      .pipe(map((res: any) => res.data as T));
  }
}
