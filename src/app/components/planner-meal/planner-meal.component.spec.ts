import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerMealComponent } from './planner-meal.component';

describe('PlannerMealComponent', () => {
  let component: PlannerMealComponent;
  let fixture: ComponentFixture<PlannerMealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannerMealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlannerMealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
