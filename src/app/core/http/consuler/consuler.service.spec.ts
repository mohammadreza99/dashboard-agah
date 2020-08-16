import { TestBed } from '@angular/core/testing';

import { ConsulerService } from './consuler.service';

describe('ConsulerService', () => {
  let service: ConsulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
