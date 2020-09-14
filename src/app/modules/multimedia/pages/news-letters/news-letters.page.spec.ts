import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsLettersPage } from './news-letters.page';

describe('NewsLettersPage', () => {
  let component: NewsLettersPage;
  let fixture: ComponentFixture<NewsLettersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsLettersPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsLettersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
