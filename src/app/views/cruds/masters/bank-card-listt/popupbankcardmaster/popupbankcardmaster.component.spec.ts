import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupbankcardmasterComponent } from './popupbankcardmaster.component';

describe('PopupbankcardmasterComponent', () => {
  let component: PopupbankcardmasterComponent;
  let fixture: ComponentFixture<PopupbankcardmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupbankcardmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupbankcardmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
