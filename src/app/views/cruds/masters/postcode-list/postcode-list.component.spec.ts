import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostcodeListComponent } from './postcode-list.component';

describe('PostcodeListComponent', () => {
  let component: PostcodeListComponent;
  let fixture: ComponentFixture<PostcodeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostcodeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostcodeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
