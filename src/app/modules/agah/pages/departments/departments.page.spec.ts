import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsPage } from './departments.page';

describe('DepartmentsPage', () => {
  let component: DepartmentsPage;
  let fixture: ComponentFixture<DepartmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
