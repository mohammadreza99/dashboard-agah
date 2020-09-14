import { TestBed } from '@angular/core/testing';

import { ContactCommentService } from './contact-comment.service';

describe('ContactCommentService', () => {
  let service: ContactCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
