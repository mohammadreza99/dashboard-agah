import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLetterUsersPage } from './news-letter-users.page';

describe('NewsLetterUsersPage', () => {
  let component: NewsLetterUsersPage;
  let fixture: ComponentFixture<NewsLetterUsersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLetterUsersPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLetterUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
