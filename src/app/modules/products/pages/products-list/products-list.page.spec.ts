import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListPage } from './products-list.page';

describe('ProductsListPage', () => {
  let component: ProductsListPage;
  let fixture: ComponentFixture<ProductsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
