import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeesPage } from './employees.page';

describe('EmployeesPage', () => {
  let component: EmployeesPage;
  let fixture: ComponentFixture<EmployeesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeesPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
