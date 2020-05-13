import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicListComponent } from './servic-list.component';

describe('ServicListComponent', () => {
  let component: ServicListComponent;
  let fixture: ComponentFixture<ServicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
