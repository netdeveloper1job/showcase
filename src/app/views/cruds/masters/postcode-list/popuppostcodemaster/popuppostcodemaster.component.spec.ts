import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopuppostcodemasterComponent } from './popuppostcodemaster.component';

describe('PopuppostcodemasterComponent', () => {
  let component: PopuppostcodemasterComponent;
  let fixture: ComponentFixture<PopuppostcodemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopuppostcodemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopuppostcodemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
