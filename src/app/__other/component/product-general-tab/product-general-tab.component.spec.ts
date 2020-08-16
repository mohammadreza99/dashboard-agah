import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGeneralTabComponent } from './product-general-tab.component';

describe('ProductGeneralTabComponent', () => {
  let component: ProductGeneralTabComponent;
  let fixture: ComponentFixture<ProductGeneralTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGeneralTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGeneralTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
