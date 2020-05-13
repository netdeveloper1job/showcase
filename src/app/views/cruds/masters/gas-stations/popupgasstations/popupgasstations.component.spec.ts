import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupgasstationsComponent } from './popupgasstations.component';

describe('PopupgasstationsComponent', () => {
  let component: PopupgasstationsComponent;
  let fixture: ComponentFixture<PopupgasstationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupgasstationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupgasstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
