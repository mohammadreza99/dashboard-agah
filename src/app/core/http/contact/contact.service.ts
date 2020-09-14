import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '@shared/models/contact.model';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'contacts';

  get(): Observable<Contact> {
    return this.apiService.get<Contact>(this.endPoint);
  }

  post(contact: Contact): Observable<Contact> {
    const formData = this.apiService.getFormData(contact);
    return this.apiService.post<Contact>(`${this.endPoint}`, formData);
  }
}
