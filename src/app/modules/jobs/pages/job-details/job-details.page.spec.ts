import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsPage } from './job-details.page';

describe('JobDetailsPage', () => {
  let component: JobDetailsPage;
  let fixture: ComponentFixture<JobDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobDetailsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
