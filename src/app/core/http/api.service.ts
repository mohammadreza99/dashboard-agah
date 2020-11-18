import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.apiUrl;

  get<T>(endpoint: string, options?: any) {
    return this.http
      .get<T>(this.baseUrl + endpoint, options)
      .pipe(map((res: any) => res.data as T));
  }

  post<T>(endpoint: string, data: any, options?: any) {
    if (!options) {
      options = {};
    }
    return this.http
      .post<T>(this.baseUrl + endpoint, data, options)
      .pipe(map((res: any) => res.data as T));
  }

  put<T>(endpoint: string, data: any, options?: any) {
    if (!options) {
      options = {};
    }
    return this.http
      .put(this.baseUrl + endpoint, data, options)
      .pipe(map((res: any) => res.data as T));
  }

  patch<T>(endpoint: string, data: any, options?: any) {
    if (!options) {
      options = {};
    }
    return this.http
      .patch(this.baseUrl + endpoint, data, options)
      .pipe(map((res: any) => res.data as T));
  }

  delete<T>(endpoint: string, options?: any) {
    if (!options) {
      options = {};
    }
    return this.http
      .delete<T>(this.baseUrl + endpoint, options)
      .pipe(map((res: any) => res.data as T));
  }

  getFormData(obj: any, editMode: boolean = false): FormData {
    const formData = new FormData();
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (Array.isArray(obj[key])) {
          for (let i = 0; i < obj[key].length; i++) {
            formData.append(key + '[' + i + ']', obj[key][i]);
          }
        } else if (
          typeof obj[key] === 'object' &&
          key !== 'image' &&
          key !== 'images' &&
          key !== 'logo' &&
          key !== 'time_estimate' &&
          key !== 'time' &&
          key !== 'video' &&
          key !== 'birthday'
        ) {
          for (const subkey in obj[key]) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              formData.append(`${key}[${subkey}]`, obj[key][subkey]);
            }
          }
        } else {
          formData.append(key, obj[key]);
        }
      }
    }
    if (editMode) {
      formData.append('_method', 'PATCH');
    }
    return formData;
  }
}
