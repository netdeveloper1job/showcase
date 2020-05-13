import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditanswersPopupComponent } from './auditanswers-popup.component';

describe('AuditanswersPopupComponent', () => {
  let component: AuditanswersPopupComponent;
  let fixture: ComponentFixture<AuditanswersPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditanswersPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditanswersPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
