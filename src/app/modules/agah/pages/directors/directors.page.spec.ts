import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorsPage } from './directors.page';

describe('DirectorsPage', () => {
  let component: DirectorsPage;
  let fixture: ComponentFixture<DirectorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
