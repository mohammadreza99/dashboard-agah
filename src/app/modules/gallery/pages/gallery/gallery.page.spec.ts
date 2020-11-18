import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryPage } from './gallery.page';

describe('GalleryPage', () => {
  let component: GalleryPage;
  let fixture: ComponentFixture<GalleryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GalleryPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
