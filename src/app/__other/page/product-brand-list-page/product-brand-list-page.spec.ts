import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBrandListPage } from './product-brand-list-page';

describe('ProductBrandListPage', () => {
  let component: ProductBrandListPage;
  let fixture: ComponentFixture<ProductBrandListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductBrandListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBrandListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
