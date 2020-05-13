import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoutnryListComponent } from './coutnry-list.component';

describe('CoutnryListComponent', () => {
  let component: CoutnryListComponent;
  let fixture: ComponentFixture<CoutnryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoutnryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoutnryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
