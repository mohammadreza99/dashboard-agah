import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtraFieldListPage } from './product-extra-field-list-page';

describe('ProductExtraFieldListPage', () => {
  let component: ProductExtraFieldListPage;
  let fixture: ComponentFixture<ProductExtraFieldListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExtraFieldListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExtraFieldListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
