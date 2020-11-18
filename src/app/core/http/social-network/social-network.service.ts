import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { SocialNetwork } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class SocialNetworkService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'social-networks';

  get(): Observable<SocialNetwork[]> {
    return this.apiService.get<SocialNetwork[]>(this.endPoint);
  }

  getById(socialNetworkId: number | string): Observable<SocialNetwork> {
    return this.apiService.get<SocialNetwork>(
      `${this.endPoint}/${socialNetworkId}`
    );
  }

  post(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const formData = this.apiService.getFormData(socialNetwork);
    return this.apiService.post<SocialNetwork>(`${this.endPoint}`, formData);
  }

  patch(socialNetwork: SocialNetwork): Observable<SocialNetwork> {
    const formData = this.apiService.getFormData(socialNetwork, true);
    return this.apiService.post<SocialNetwork>(
      `${this.endPoint}/${socialNetwork.id}`,
      formData
    );
  }

  delete(socialNetworkId: number | string) {
    return this.apiService.delete<SocialNetwork>(
      `${this.endPoint}/${socialNetworkId}`
    );
  }
}
