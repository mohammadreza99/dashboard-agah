import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { JobRequest, JobItem } from '@app/shared/models/job.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private apiService: ApiService) {}

  private readonly jobsEndPoint = 'jobs';
  private readonly jobRequestEndPoint = 'job-requests';

  get(): Observable<JobItem[]> {
    return this.apiService
      .get<JobItem[]>(this.jobsEndPoint)
      .pipe(map((res: any) => res.data));
  }

  getById(jobId: string | number) {
    return this.apiService.get<JobItem>(`${this.jobsEndPoint}/${jobId}`);
  }

  request(form: JobRequest): Observable<JobRequest> {
    return this.apiService.post<JobRequest>(this.jobRequestEndPoint, form);
  }
}
