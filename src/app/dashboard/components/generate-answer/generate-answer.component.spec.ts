import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAnswerComponent } from './generate-answer.component';

describe('GenerateAnswerComponent', () => {
  let component: GenerateAnswerComponent;
  let fixture: ComponentFixture<GenerateAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
