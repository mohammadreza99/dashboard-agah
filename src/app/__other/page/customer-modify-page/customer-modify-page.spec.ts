import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModifyPage } from './customer-modify-page';

describe('CustomerModifyPage', () => {
  let component: CustomerModifyPage;
  let fixture: ComponentFixture<CustomerModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
