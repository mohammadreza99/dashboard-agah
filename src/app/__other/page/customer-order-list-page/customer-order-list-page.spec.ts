import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderListPage } from './customer-order-list-page';

describe('CustomerOrderListPage', () => {
  let component: CustomerOrderListPage;
  let fixture: ComponentFixture<CustomerOrderListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
