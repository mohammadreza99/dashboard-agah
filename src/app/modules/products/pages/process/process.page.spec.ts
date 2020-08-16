import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessPage } from './process.page';

describe('ProcessPage', () => {
  let component: ProcessPage;
  let fixture: ComponentFixture<ProcessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
