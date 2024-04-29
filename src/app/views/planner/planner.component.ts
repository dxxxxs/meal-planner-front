import { Component } from '@angular/core';
import { PlannerSuggestionFormComponent } from '../../components/planner-suggestion-form/planner-suggestion-form.component';
import { RecipeCardComponent } from '../../components/recipe.card/recipe.card.component';
import { PlannerMealComponent } from '../../components/planner-meal/planner-meal.component';
import { Months } from '../../_interfaces/months';
@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    PlannerMealComponent
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})

export class PlannerComponent {

  today: Date = new Date();
  day: number = this.today.getDate();
  month: number = this.today.getMonth();
  monthName: string = Months[this.month];
  year:number = this.today.getFullYear();

  // Método para ir al día anterior
  goToPreviousDay() {
    this.today.setDate(this.today.getDate() - 1);
    this.updateDate();
  }

  // Método para ir al día siguiente
  goToNextDay() {
    this.today.setDate(this.today.getDate() + 1);
    this.updateDate();
  }

  // Método para actualizar el día y el nombre del mes
  updateDate() {
    this.day = this.today.getDate();
    this.month = this.today.getMonth();
    this.monthName = Months[this.month];
  }

  isNextDayDisabled(): boolean {
    const tomorrow: Date = new Date(this.today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow > new Date();
  }
}
