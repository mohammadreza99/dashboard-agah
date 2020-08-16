import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGroupListPage } from './customer-group-list-page';

describe('CustomerGroupListPage', () => {
  let component: CustomerGroupListPage;
  let fixture: ComponentFixture<CustomerGroupListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerGroupListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerGroupListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
