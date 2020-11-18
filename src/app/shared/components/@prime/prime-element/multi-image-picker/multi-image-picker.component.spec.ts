import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiImagePickerComponent } from './multi-image-picker.component';


describe('MultiImagePickerComponent', () => {
  let component: MultiImagePickerComponent;
  let fixture: ComponentFixture<MultiImagePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultiImagePickerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
