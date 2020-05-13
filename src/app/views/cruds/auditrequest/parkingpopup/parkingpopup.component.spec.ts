import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingpopupComponent } from './parkingpopup.component';

describe('ParkingpopupComponent', () => {
  let component: ParkingpopupComponent;
  let fixture: ComponentFixture<ParkingpopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingpopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
