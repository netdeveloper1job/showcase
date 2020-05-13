import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupcitymasterComponent } from './popupcitymaster.component';

describe('PopupcitymasterComponent', () => {
  let component: PopupcitymasterComponent;
  let fixture: ComponentFixture<PopupcitymasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupcitymasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupcitymasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
