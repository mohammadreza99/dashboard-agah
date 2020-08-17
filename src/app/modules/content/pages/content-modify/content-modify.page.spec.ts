import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentModifyPage } from './content-modify.page';

describe('ContentModifyPage', () => {
  let component: ContentModifyPage;
  let fixture: ComponentFixture<ContentModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
