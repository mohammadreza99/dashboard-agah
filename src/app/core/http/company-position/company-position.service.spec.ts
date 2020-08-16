import { TestBed } from '@angular/core/testing';

import { CompanyPositionService } from './company-position.service';

describe('CompanyPositionService', () => {
  let service: CompanyPositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyPositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
