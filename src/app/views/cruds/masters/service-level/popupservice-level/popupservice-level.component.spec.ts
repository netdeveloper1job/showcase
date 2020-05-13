import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupserviceLevelComponent } from './popupservice-level.component';

describe('PopupserviceLevelComponent', () => {
  let component: PopupserviceLevelComponent;
  let fixture: ComponentFixture<PopupserviceLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupserviceLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupserviceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
