import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioneditPopupComponent } from './questionedit-popup.component';

describe('QuestioneditPopupComponent', () => {
  let component: QuestioneditPopupComponent;
  let fixture: ComponentFixture<QuestioneditPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestioneditPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioneditPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
