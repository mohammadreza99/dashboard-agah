import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryListPage } from './product-category-list-page';

describe('ProductCategoryListPage', () => {
  let component: ProductCategoryListPage;
  let fixture: ComponentFixture<ProductCategoryListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCategoryListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
