import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostModifyPage } from './post-modify.page';

describe('PostModifyPage', () => {
  let component: PostModifyPage;
  let fixture: ComponentFixture<PostModifyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostModifyPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostModifyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
