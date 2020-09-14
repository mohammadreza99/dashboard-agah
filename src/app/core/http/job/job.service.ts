import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import {
  JobRequest,
  JobItem,
  JobItemDetails,
} from '@app/shared/models/job.model';
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

  getById(jobId: string) {
    return this.apiService.get<JobItem>(`${this.jobsEndPoint}/${jobId}`);
  }

  post(job: JobItem): Observable<JobItem> {
    const formData = this.apiService.getFormData(job);
    return this.apiService.post<JobItem>(`${this.jobsEndPoint}`, formData);
  }

  patch(job: JobItem): Observable<JobItem> {
    const formData = this.apiService.getFormData(job, true);
    return this.apiService.post<JobItem>(
      `${this.jobsEndPoint}/${job.id}`,
      formData
    );
  }

  delete(jobId: object) {
    return this.apiService.delete<JobItem>(`${this.jobsEndPoint}/${jobId}`);
  }

  getDetails(jobId: string) {
    return this.apiService
      .get<JobItemDetails[]>(`${this.jobsEndPoint}/${jobId}/details`)
      .pipe(map((res: any) => res.data));
  }

  postDetails(jobId: object, jobDetails: JobItemDetails) {
    const formData = this.apiService.getFormData(jobDetails);
    return this.apiService.post<JobItemDetails>(
      `${this.jobsEndPoint}/${jobId}/details`,
      formData
    );
  }

  patchDetails(jobId: object, jobDetails: JobItemDetails) {
    const formData = this.apiService.getFormData(jobDetails, true);
    return this.apiService.post<JobItemDetails>(
      `${this.jobsEndPoint}/${jobId}/details/${jobDetails.id}`,
      formData
    );
  }

  deleteDetails(jobId: object, jobDetailsId: object) {
    return this.apiService.delete<JobItem>(
      `${this.jobsEndPoint}/${jobId}/details/${jobDetailsId}`
    );
  }

  getRequests(): Observable<JobRequest[]> {
    return this.apiService
      .get<JobRequest[]>(this.jobRequestEndPoint)
      .pipe(map((res: any) => res.data));
  }

  deleteRequest(jobRequestId: object) {
    return this.apiService.delete<JobRequest>(
      `${this.jobRequestEndPoint}/${jobRequestId}`
    );
  }

  confirmRequest(jobRequestId: object) {
    return this.apiService.patch<JobRequest>(
      `${this.jobRequestEndPoint}/${jobRequestId}/confirm`,
      null
    );
  }
}
