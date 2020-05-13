import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterparkingsComponent } from './filterparkings.component';

describe('FilterparkingsComponent', () => {
  let component: FilterparkingsComponent;
  let fixture: ComponentFixture<FilterparkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterparkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterparkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
