import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorsPage } from './counselors.page';

describe('CounselorsPage', () => {
  let component: CounselorsPage;
  let fixture: ComponentFixture<CounselorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CounselorsPage],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
