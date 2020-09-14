import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { Testimonial } from '@shared/models/testimonial.model';

@Injectable({
  providedIn: 'root',
})
export class TestimonialService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'testimonials';

  get(): Observable<Testimonial[]> {
    return this.apiService.get<Testimonial[]>(this.endPoint);
  }

  getById(testimonialId: object): Observable<Testimonial> {
    return this.apiService.get<Testimonial>(
      `${this.endPoint}/${testimonialId}`
    );
  }

  post(testimonial: Testimonial): Observable<Testimonial> {
    const formData = this.apiService.getFormData(testimonial);
    return this.apiService.post<Testimonial>(`${this.endPoint}`, formData);
  }

  patch(testimonial: Testimonial): Observable<Testimonial> {
    const formData = this.apiService.getFormData(testimonial, true);
    return this.apiService.post<Testimonial>(
      `${this.endPoint}/${testimonial.id}`,
      formData
    );
  }

  delete(testimonialId: object) {
    return this.apiService.delete<Testimonial>(
      `${this.endPoint}/${testimonialId}`
    );
  }
}
