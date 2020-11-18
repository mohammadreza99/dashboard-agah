import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '@core/http/api.service';
import { JobRequest, JobItem, JobItemDetails } from '@shared/models';
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

  delete(jobId: number | string) {
    return this.apiService.delete<JobItem>(`${this.jobsEndPoint}/${jobId}`);
  }

  getDetails(jobId: string | number) {
    return this.apiService
      .get<JobItemDetails[]>(`${this.jobsEndPoint}/${jobId}/details`)
      .pipe(map((res: any) => res.data));
  }

  postDetails(jobId: number | string, jobDetails: JobItemDetails) {
    const formData = this.apiService.getFormData(jobDetails);
    return this.apiService.post<JobItemDetails>(
      `${this.jobsEndPoint}/${jobId}/details`,
      formData
    );
  }

  patchDetails(jobId: number | string, jobDetails: JobItemDetails) {
    const formData = this.apiService.getFormData(jobDetails, true);
    return this.apiService.post<JobItemDetails>(
      `${this.jobsEndPoint}/${jobId}/details/${jobDetails.id}`,
      formData
    );
  }

  deleteDetails(jobId: number | string, jobDetailsId: number | string) {
    return this.apiService.delete<JobItem>(
      `${this.jobsEndPoint}/${jobId}/details/${jobDetailsId}`
    );
  }

  getRequests(): Observable<JobRequest[]> {
    return this.apiService
      .get<JobRequest[]>(this.jobRequestEndPoint)
      .pipe(map((res: any) => res.data));
  }

  deleteRequest(jobRequestId: number | string) {
    return this.apiService.delete<JobRequest>(
      `${this.jobRequestEndPoint}/${jobRequestId}`
    );
  }

  confirmRequest(jobRequestId: number | string) {
    return this.apiService.patch<JobRequest>(
      `${this.jobRequestEndPoint}/${jobRequestId}/confirm`,
      null
    );
  }
}
