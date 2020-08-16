import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureTabComponent } from './product-feature-tab.component';

describe('ProductFeatureTabComponent', () => {
  let component: ProductFeatureTabComponent;
  let fixture: ComponentFixture<ProductFeatureTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFeatureTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
