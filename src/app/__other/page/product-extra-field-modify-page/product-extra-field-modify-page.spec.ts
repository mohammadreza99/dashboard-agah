import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtraFieldModifyPage } from './product-extra-field-modify-page';

describe('ProductExtraFieldModifyPage', () => {
  let component: ProductExtraFieldModifyPage;
  let fixture: ComponentFixture<ProductExtraFieldModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExtraFieldModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExtraFieldModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
