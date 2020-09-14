import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseContentsPage } from './course-contents.page';

describe('CourseContentsPage', () => {
  let component: CourseContentsPage;
  let fixture: ComponentFixture<CourseContentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseContentsPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseContentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
