import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Counselor } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CounselorService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'counselors';

  get(): Observable<Counselor[]> {
    return this.apiService
      .get<Counselor[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(counselorId: number | string): Observable<Counselor> {
    return this.apiService.get<Counselor>(`${this.endPoint}/${counselorId}`);
  }

  post(counselor: Counselor): Observable<Counselor> {
    const formData = this.apiService.getFormData(counselor);
    return this.apiService.post<Counselor>(`${this.endPoint}`, formData);
  }

  patch(counselor: Counselor): Observable<Counselor> {
    const formData = this.apiService.getFormData(counselor, true);
    return this.apiService.post<Counselor>(
      `${this.endPoint}/${counselor.id}`,
      formData
    );
  }

  delete(counselorId: number | string) {
    return this.apiService.delete<Counselor>(`${this.endPoint}/${counselorId}`);
  }
}
