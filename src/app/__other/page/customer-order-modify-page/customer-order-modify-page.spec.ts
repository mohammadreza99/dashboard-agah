import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOrderModifyPage } from './customer-order-modify-page';

describe('CustomerOrderModifyPage', () => {
  let component: CustomerOrderModifyPage;
  let fixture: ComponentFixture<CustomerOrderModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerOrderModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOrderModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
