import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddauditrequestPopupComponent } from './addauditrequest-popup.component';

describe('AddauditrequestPopupComponent', () => {
  let component: AddauditrequestPopupComponent;
  let fixture: ComponentFixture<AddauditrequestPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddauditrequestPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddauditrequestPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
