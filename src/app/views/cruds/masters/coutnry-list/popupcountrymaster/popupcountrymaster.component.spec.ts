import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcountrymasterComponent } from './popupcountrymaster.component';

describe('PopupcountrymasterComponent', () => {
  let component: PopupcountrymasterComponent;
  let fixture: ComponentFixture<PopupcountrymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupcountrymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupcountrymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
