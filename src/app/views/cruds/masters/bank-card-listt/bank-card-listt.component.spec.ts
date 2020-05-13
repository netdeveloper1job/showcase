import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCardListtComponent } from './bank-card-listt.component';

describe('BankCardListtComponent', () => {
  let component: BankCardListtComponent;
  let fixture: ComponentFixture<BankCardListtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankCardListtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankCardListtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
