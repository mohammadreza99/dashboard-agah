import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsListPage } from './posts-list.page';

describe('PostsListPage', () => {
  let component: PostsListPage;
  let fixture: ComponentFixture<PostsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsListPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
