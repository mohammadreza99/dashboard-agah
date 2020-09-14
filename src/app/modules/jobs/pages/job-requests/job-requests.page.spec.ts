import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRequestsPage } from './job-requests.page';

describe('JobRequestsPage', () => {
  let component: JobRequestsPage;
  let fixture: ComponentFixture<JobRequestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRequestsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRequestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
