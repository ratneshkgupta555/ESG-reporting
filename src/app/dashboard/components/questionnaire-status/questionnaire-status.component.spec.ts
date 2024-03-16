import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireStatusComponent } from './questionnaire-status.component';

describe('QuestionnaireStatusComponent', () => {
  let component: QuestionnaireStatusComponent;
  let fixture: ComponentFixture<QuestionnaireStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnaireStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
