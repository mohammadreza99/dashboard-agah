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

  getProductById(productId: string | number): Observable<Product> {
    return this.apiService.get<Product>(`${this.endPoint}/${productId}`);
  }
}
