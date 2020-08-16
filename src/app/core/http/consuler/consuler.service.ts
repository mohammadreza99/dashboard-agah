import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsulerService {
  constructor(private apiService: ApiService) {}

  private readonly endPoint = 'consuler';

}
