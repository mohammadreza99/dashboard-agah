import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionsPage } from './positions.page';

describe('PositionsPage', () => {
  let component: PositionsPage;
  let fixture: ComponentFixture<PositionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PositionsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PositionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
