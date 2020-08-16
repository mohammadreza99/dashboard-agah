import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTagTabComponent } from './product-tag-tab.component';

describe('ProductTagTabComponent', () => {
  let component: ProductTagTabComponent;
  let fixture: ComponentFixture<ProductTagTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTagTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTagTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
