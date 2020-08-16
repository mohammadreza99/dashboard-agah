import { TestBed } from '@angular/core/testing';

import { StockholderService } from './stockholder.service';

describe('StackHolderService', () => {
  let service: StockholderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockholderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
