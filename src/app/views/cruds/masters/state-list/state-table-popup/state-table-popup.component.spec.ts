import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateTablePopupComponent } from './state-table-popup.component';

describe('StateTablePopupComponent', () => {
  let component: StateTablePopupComponent;
  let fixture: ComponentFixture<StateTablePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateTablePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateTablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
