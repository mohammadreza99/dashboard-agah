import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductImageTabComponent } from './product-image-tab.component';

describe('ProductImageTabComponent', () => {
  let component: ProductImageTabComponent;
  let fixture: ComponentFixture<ProductImageTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductImageTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductImageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
