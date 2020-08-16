import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryModifyPage } from './product-category-modify-page';

describe('ProductCategoryModifyPage', () => {
  let component: ProductCategoryModifyPage;
  let fixture: ComponentFixture<ProductCategoryModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
