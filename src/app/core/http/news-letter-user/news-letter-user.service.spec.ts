import { TestBed } from '@angular/core/testing';

import { NewsLetterUserService } from './news-letter-user.service';

describe('NewsLetterUserService', () => {
  let service: NewsLetterUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsLetterUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
