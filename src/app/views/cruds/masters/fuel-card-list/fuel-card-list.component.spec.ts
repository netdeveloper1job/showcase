import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelCardListComponent } from './fuel-card-list.component';

describe('FuelCardListComponent', () => {
  let component: FuelCardListComponent;
  let fixture: ComponentFixture<FuelCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
