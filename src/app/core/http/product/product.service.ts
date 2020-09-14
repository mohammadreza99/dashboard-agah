import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ApiService } from '@core/http/api.service';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'products';

  get(): Observable<Product[]> {
    return this.apiService
      .get<Product[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getByLimit(limit: number): Observable<Product[]> {
    return this.apiService
      .get<Product[]>(`${this.endPoint}?limit=${limit}`)
      .pipe(map((res: any) => res.data));
  }

  getById(productId: string): Observable<Product> {
    return this.apiService.get<Product>(`${this.endPoint}/${productId}`);
  }

  post(product: Product): Observable<Product> {
    const formData = this.apiService.getFormData(product);
    return this.apiService.post<Product>(`${this.endPoint}`, formData);
  }

  patch(product: Product): Observable<Product> {
    const formData = this.apiService.getFormData(product, true);
    return this.apiService.post<Product>(
      `${this.endPoint}/${product.id}`,
      formData
    );
  }

  delete(productId: object) {
    return this.apiService.delete<Product>(`${this.endPoint}/${productId}`);
  }
}
