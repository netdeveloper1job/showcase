import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GasStationsComponent } from './gas-stations.component';

describe('GasStationsComponent', () => {
  let component: GasStationsComponent;
  let fixture: ComponentFixture<GasStationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasStationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GasStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
