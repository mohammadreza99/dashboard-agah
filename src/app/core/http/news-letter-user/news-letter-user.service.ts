import { Injectable } from '@angular/core';

import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class NewsLetterUserService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'news-letter-users';

  subscribe(emailAddress: any) {
    return this.apiService.post(this.endPoint, { email: emailAddress });
  }
}
