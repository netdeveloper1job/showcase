import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageresponsePopupComponent } from './imageresponse-popup.component';

describe('ImageresponsePopupComponent', () => {
  let component: ImageresponsePopupComponent;
  let fixture: ComponentFixture<ImageresponsePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageresponsePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageresponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
