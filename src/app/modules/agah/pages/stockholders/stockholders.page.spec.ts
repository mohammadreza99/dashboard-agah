import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockholdersPage } from './stockholders.page';

describe('StockholdersPage', () => {
  let component: StockholdersPage;
  let fixture: ComponentFixture<StockholdersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockholdersPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockholdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
