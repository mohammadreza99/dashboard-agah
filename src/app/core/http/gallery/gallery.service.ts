import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Employee } from '@app/shared/models/employee.model';
import { GalleryItem } from '@app/shared/models/gallery.model';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'galleries';

  get(): Observable<GalleryItem[]> {
    return this.apiService.get<any[]>(this.endPoint);
  }

  getById(galleryId: number): Observable<GalleryItem> {
    return this.apiService.get<any>(`${this.endPoint}/${galleryId}`);
  }
}
