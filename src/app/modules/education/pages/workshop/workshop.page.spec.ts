import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopPage } from './workshop.page';

describe('WorkshopPage', () => {
  let component: WorkshopPage;
  let fixture: ComponentFixture<WorkshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
