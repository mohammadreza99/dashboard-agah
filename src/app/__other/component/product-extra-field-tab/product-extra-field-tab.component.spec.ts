import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtraFieldTabComponent } from './product-extra-field-tab.component';

describe('ProductExtraFieldTabComponent', () => {
  let component: ProductExtraFieldTabComponent;
  let fixture: ComponentFixture<ProductExtraFieldTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExtraFieldTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExtraFieldTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
