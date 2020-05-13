import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditmappingComponent } from './auditmapping.component';

describe('AuditmappingComponent', () => {
  let component: AuditmappingComponent;
  let fixture: ComponentFixture<AuditmappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditmappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditmappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
