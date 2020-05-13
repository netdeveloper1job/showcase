import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditanswersComponent } from './auditanswers.component';

describe('AuditanswersComponent', () => {
  let component: AuditanswersComponent;
  let fixture: ComponentFixture<AuditanswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditanswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditanswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
