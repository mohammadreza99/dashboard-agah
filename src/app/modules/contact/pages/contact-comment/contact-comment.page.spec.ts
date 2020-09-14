import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactCommentPage } from './contact-comment.page';

describe('ContactCommentPage', () => {
  let component: ContactCommentPage;
  let fixture: ComponentFixture<ContactCommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactCommentPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactCommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
