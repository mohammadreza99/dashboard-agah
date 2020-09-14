import { TestBed } from '@angular/core/testing';

import { CounselorService } from './counselor.service';

describe('CounselorService', () => {
  let service: CounselorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounselorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
