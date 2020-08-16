import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPriceTabComponent } from './product-price-tab.component';

describe('ProductPriceTabComponent', () => {
  let component: ProductPriceTabComponent;
  let fixture: ComponentFixture<ProductPriceTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductPriceTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPriceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
