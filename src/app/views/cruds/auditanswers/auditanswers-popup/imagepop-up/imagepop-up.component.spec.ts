import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagepopUpComponent } from './imagepop-up.component';

describe('ImagepopUpComponent', () => {
  let component: ImagepopUpComponent;
  let fixture: ComponentFixture<ImagepopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagepopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagepopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
