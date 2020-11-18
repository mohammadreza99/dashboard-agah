import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { Workshop } from '@shared/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WorkshopService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'workshops';

  get(): Observable<Workshop[]> {
    return this.apiService
      .get<Workshop[]>(this.endPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(workshopId: string | number) {
    return this.apiService.get<Workshop>(`${this.endPoint}/${workshopId}`);
  }

  post(workshop: Workshop): Observable<Workshop> {
    const formData = this.apiService.getFormData(workshop);
    return this.apiService.post<Workshop>(`${this.endPoint}`, formData);
  }

  patch(workshop: Workshop): Observable<Workshop> {
    const formData = this.apiService.getFormData(workshop, true);
    return this.apiService.post<Workshop>(
      `${this.endPoint}/${workshop.id}`,
      formData
    );
  }

  delete(workshopId: number | string) {
    return this.apiService.delete<Workshop>(`${this.endPoint}/${workshopId}`);
  }
}
