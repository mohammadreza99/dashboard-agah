import { Injectable } from '@angular/core';
import { ApiService } from '@core/http/api.service';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor(public apiService: ApiService) {}

  private readonly endPoint = 'lang';

  getLang() {
    return this.apiService.get(this.endPoint);
  }
}
