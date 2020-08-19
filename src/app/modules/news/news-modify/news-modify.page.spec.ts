import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsModifyPage } from './news-modify.page';

describe('NewsModifyPage', () => {
  let component: NewsModifyPage;
  let fixture: ComponentFixture<NewsModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
