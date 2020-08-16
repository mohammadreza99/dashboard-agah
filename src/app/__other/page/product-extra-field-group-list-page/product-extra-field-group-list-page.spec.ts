import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductExtraFieldGroupListPage } from './product-extra-field-group-list-page';

describe('ProductExtraFieldGroupListPage', () => {
  let component: ProductExtraFieldGroupListPage;
  let fixture: ComponentFixture<ProductExtraFieldGroupListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductExtraFieldGroupListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductExtraFieldGroupListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
