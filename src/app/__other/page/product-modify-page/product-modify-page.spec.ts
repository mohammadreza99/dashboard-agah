import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModifyPage } from './product-modify-page';

describe('ProductModifyPage', () => {
  let component: ProductModifyPage;
  let fixture: ComponentFixture<ProductModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
