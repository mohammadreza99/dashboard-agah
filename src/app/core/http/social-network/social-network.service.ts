import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { SocialNetwork } from '@shared/models/social-network.model';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'social-networks';

  get(): Observable<SocialNetwork[]> {
    return this.apiService.get<SocialNetwork[]>(this.endPoint);
  }

  getById(socialNetworkId: string | number): Observable<SocialNetwork> {
    return this.apiService.get<SocialNetwork>(
      `${this.endPoint}/${socialNetworkId}`
    );
  }
}
