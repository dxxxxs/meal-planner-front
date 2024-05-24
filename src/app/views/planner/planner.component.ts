import { Component } from '@angular/core';
import { PlannerSuggestionFormComponent } from '../../components/planner-suggestion-form/planner-suggestion-form.component';
import { RecipeCardComponent } from '../../components/recipe.card/recipe.card.component';
import { PlannerMealComponent } from '../../components/planner-meal/planner-meal.component';
import { Months } from '../../_interfaces/months';
import { MealTypes } from '../../_interfaces/meal-types';
import { StorageServiceService } from '../../_services/storage.service.service';
import { PlannerServiceService } from '../../_services/planner-service.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { Macros, Plan } from '../../_interfaces/plan';
import { ModalRecipeComponent } from '../../components/modal-recipe/modal-recipe.component';
import { Recipe } from '../../_interfaces/recipe.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [
    PlannerMealComponent,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalRecipeComponent
  ],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})

export class PlannerComponent {

  date: Date = new Date();
  dateFormControl = new FormControl(this.date);

  MealTypes = MealTypes;

  plan?: Plan;


  constructor(private storageService: StorageServiceService, private plannerService: PlannerServiceService,  private router: Router) {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['']);
    }
    this.getPlan(new Date());
  }

  ngOnInit(): void {
    console.log("e");
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['']);
    }
  }

  onDateChange(event: any) {
    const selectedDate: Date = new Date(event.value);
    this.getPlan(selectedDate);
  }

  getPlan(arg: Date) {
    const month: number = arg.getMonth() + 1;
    const day: number = arg.getDate();
    const year: number = arg.getFullYear();
    const date: string = month + "-" + day + "-" + year;

    this.plannerService.getPlanner(date).subscribe((res) => {
      this.plan = res.plan;
    });
  }

  removeFromPlanner(emitData: any) {
    if (this.plan) {
      if (emitData.meal == "breakfast") {
        this.plan.breakfast = emitData.data;
      }
      if (emitData.meal == "snack") {
        this.plan.snack = emitData.data;
      }
      if (emitData.meal == "lunch") {
        this.plan.lunch = emitData.data;
      }
      if (emitData.meal == "teatime") {
        this.plan.teatime = emitData.data;
      }
      if (emitData.meal == "dinner") {
        this.plan.dinner = emitData.data;
      }

      this.updatePlan();
    }
  }

  addToPlanner(emitData: any) {
    if (this.plan) {
      if (emitData.meal == "breakfast") {
        this.plan.breakfast = emitData.data;
      }
      if (emitData.meal == "snack") {
        this.plan.snack = emitData.data;
      }
      if (emitData.meal == "lunch") {
        this.plan.lunch = emitData.data;
      }
      if (emitData.meal == "teatime") {
        this.plan.teatime = emitData.data;
      }
      if (emitData.meal == "dinner") {
        this.plan.dinner = emitData.data;
      }

      this.updatePlan();
    }
  }

  updatePlan() {
    if (this.plan) {
      this.plannerService.updatePlanner(this.plan).subscribe((res) => { 
      },
        (error) => {
          console.log(error);
        })
    }
  }

  isSetModalData: boolean = false;
  modalData?: Recipe;

  updateModalData(data: Recipe) {
    this.isSetModalData = true;
    this.modalData = data;
  }
}
