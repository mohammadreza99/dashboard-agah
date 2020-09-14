import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsPage } from './jobs.page';

describe('JobsPage', () => {
  let component: JobsPage;
  let fixture: ComponentFixture<JobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
