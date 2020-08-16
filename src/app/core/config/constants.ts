import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  // test server : http://192.168.10.207:9090/api/
  // main server : https://myagah.com/api/
  public readonly API_URL: string = 'http://192.168.10.207:9090/api/';
}
