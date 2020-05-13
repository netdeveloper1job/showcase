import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupfuelcardmasterComponent } from './popupfuelcardmaster.component';

describe('PopupfuelcardmasterComponent', () => {
  let component: PopupfuelcardmasterComponent;
  let fixture: ComponentFixture<PopupfuelcardmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupfuelcardmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupfuelcardmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
