import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryCardComponent } from '../category.card/category.card.component';
import { CuisineTypeNames, CuisineType } from '../../_interfaces/cuisine-type';
import { DishType } from '../../_interfaces/dish-type';
import { RecipeAPIResponse } from '../../_interfaces/recipe.interface';



@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {


  @Output() recipeByCuisineTypeEmitter = new EventEmitter<any>();

  cuisineType: string[] = Object.values(CuisineType);
  cuisineTypeName: string[] = Object.keys(CuisineType);

  dishTypes: string[] = Object.keys(DishType);


  emitRecipeByCuisineType(data: RecipeAPIResponse[]) {
    this.recipeByCuisineTypeEmitter.emit(data);
  }
}
