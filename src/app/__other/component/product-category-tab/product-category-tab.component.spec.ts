import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryTabComponent } from './product-category-tab.component';

describe('ProductCategoryTabComponent', () => {
  let component: ProductCategoryTabComponent;
  let fixture: ComponentFixture<ProductCategoryTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
