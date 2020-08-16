import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFeatureListPage } from './product-feature-list-page';

describe('ProductFeatureListPage', () => {
  let component: ProductFeatureListPage;
  let fixture: ComponentFixture<ProductFeatureListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductFeatureListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFeatureListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
