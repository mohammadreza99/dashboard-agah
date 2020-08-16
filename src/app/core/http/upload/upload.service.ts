import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private apiService: ApiService) {}
  private readonly endPoint = 'testimonials';

  uploadImage(image: File): Observable<HttpResponse<any>> {
    const formData = new FormData();
    formData.append('image', image);
    return this.apiService.post(`${this.endPoint}`, formData);
  }
}
