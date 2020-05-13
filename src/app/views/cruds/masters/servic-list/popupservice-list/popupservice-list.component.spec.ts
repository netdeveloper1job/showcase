import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupserviceListComponent } from './popupservice-list.component';

describe('PopupserviceListComponent', () => {
  let component: PopupserviceListComponent;
  let fixture: ComponentFixture<PopupserviceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupserviceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupserviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
