import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagListPage } from './product-tag-list-page';

describe('ProductTagListPage', () => {
  let component: ProductTagListPage;
  let fixture: ComponentFixture<ProductTagListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTagListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTagListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
