import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditresponsePopupComponent } from './auditresponse-popup.component';

describe('AuditresponsePopupComponent', () => {
  let component: AuditresponsePopupComponent;
  let fixture: ComponentFixture<AuditresponsePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditresponsePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditresponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
