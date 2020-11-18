import { Injectable } from '@angular/core';
import { Category } from '@shared/models';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'category';

  get(): Observable<Category[]> {
    return this.apiService.get<Category[]>(this.endPoint);
  }

  getById(categoryId: number | string): Observable<Category> {
    return this.apiService.get<Category>(`${this.endPoint}/${categoryId}`);
  }

  post(category: Category): Observable<Category> {
    const formData = this.apiService.getFormData(category);
    return this.apiService.post<Category>(`${this.endPoint}`, formData);
  }

  delete(categoryId: number | string) {
    return this.apiService.delete<Category>(`${this.endPoint}/${categoryId}`);
  }
}
