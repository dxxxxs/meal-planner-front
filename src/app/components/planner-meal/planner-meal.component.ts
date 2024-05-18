import { Component, Input } from '@angular/core';
import { RecipeCardComponent } from '../recipe.card/recipe.card.component';
import { UpperCasePipe } from '@angular/common';
import { RemoveWhitespacesPipe } from '../../_pipes/remove-whitespaces.pipe';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { RecipeAPIRequest, RecipeAPIResponse } from '../../_interfaces/recipe.interface';
import { ModalBusquedaComponent } from '../modal-busqueda/modal-busqueda.component';

@Component({
  selector: 'app-planner-meal',
  standalone: true,
  imports: [
    RecipeCardComponent,
    RemoveWhitespacesPipe,
    ModalBusquedaComponent
  ],
  templateUrl: './planner-meal.component.html',
  styleUrl: './planner-meal.component.scss'
})
export class PlannerMealComponent {

  @Input() mealName: string = "Meal";

  toggled: boolean = false;


  data: RecipeAPIResponse[] = [];

  constructor(private recipeService: RecipeServiceService) { }

  // ngOnInit() {
  //   this.recipeService.getRecipesByMealType(this.mealName).subscribe((res) => {
  //     this.data?.push(res);
  //   });
  // }

  toggle() {
    this.toggled = !this.toggled;
  }
}
