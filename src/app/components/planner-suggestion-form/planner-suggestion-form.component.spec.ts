import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerSuggestionFormComponent } from './planner-suggestion-form.component';

describe('PlannerSuggestionFormComponent', () => {
  let component: PlannerSuggestionFormComponent;
  let fixture: ComponentFixture<PlannerSuggestionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerSuggestionFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerSuggestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
