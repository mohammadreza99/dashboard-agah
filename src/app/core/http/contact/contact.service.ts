import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Contact } from '@shared/models/contact.model';
import { ApiService } from '@core/http/api.service';
import { ContactComment } from '@app/shared/models/contact-comment';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  private readonly contactsEndPoint = 'contacts';
  private readonly contactCommentEndPoint = 'scontact-comments';

  getContactInfo(): Observable<Contact> {
    return this.apiService.get<Contact>(this.contactsEndPoint);
  }

  submitContactComment(
    contactComment: ContactComment
  ): Observable<ContactComment> {
    return this.apiService.post<ContactComment>(
      this.contactsEndPoint,
      contactComment
    );
  }
}
