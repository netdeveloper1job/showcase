import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingStepTwoComponent } from './parking-step-two.component';

describe('ParkingStepTwoComponent', () => {
  let component: ParkingStepTwoComponent;
  let fixture: ComponentFixture<ParkingStepTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingStepTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingStepTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
