import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { GalleryItem } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'galleries';

  get(): Observable<GalleryItem[]> {
    return this.apiService
      .get<any[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(galleryId: number | string): Observable<GalleryItem> {
    return this.apiService.get<any>(`${this.endPoint}/${galleryId}`);
  }

  post(galleryItem: GalleryItem): Observable<GalleryItem> {
    const formData = this.apiService.getFormData(galleryItem);
    return this.apiService.post<GalleryItem>(`${this.endPoint}`, formData);
  }

  patch(galleryItem: GalleryItem): Observable<GalleryItem> {
    const formData = this.apiService.getFormData(galleryItem, true);
    return this.apiService.post<GalleryItem>(
      `${this.endPoint}/${galleryItem.id}`,
      formData
    );
  }

  delete(galleryItemId: number | string) {
    return this.apiService.delete<GalleryItem>(
      `${this.endPoint}/${galleryItemId}`
    );
  }
}
