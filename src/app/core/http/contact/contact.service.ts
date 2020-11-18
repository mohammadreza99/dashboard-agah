import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ContactUsInfo } from '@shared/models';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'contacts';

  get() {
    return this.apiService.get<ContactUsInfo>(this.endPoint);
  }

  post(contact: ContactUsInfo): Observable<ContactUsInfo> {
    const formData = this.apiService.getFormData(contact);
    return this.apiService.post<ContactUsInfo>(`${this.endPoint}`, formData);
  }

  patch(contact: ContactUsInfo): Observable<ContactUsInfo> {
    return this.apiService.post<ContactUsInfo>(`${this.endPoint}`, contact);
  }
}
