import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeachersPage } from './teachers.page';

describe('TeachersPage', () => {
  let component: TeachersPage;
  let fixture: ComponentFixture<TeachersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeachersPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeachersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
