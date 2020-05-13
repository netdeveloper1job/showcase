import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysubcomponentComponent } from './mysubcomponent.component';

describe('MysubcomponentComponent', () => {
  let component: MysubcomponentComponent;
  let fixture: ComponentFixture<MysubcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysubcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysubcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
