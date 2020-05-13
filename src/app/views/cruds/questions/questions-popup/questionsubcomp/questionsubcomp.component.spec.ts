import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsubcompComponent } from './questionsubcomp.component';

describe('QuestionsubcompComponent', () => {
  let component: QuestionsubcompComponent;
  let fixture: ComponentFixture<QuestionsubcompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsubcompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsubcompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
