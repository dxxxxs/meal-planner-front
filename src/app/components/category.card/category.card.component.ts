import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CamelCaseToSpacePipe } from '../../_pipes/camel-case-to-space.pipe';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { RecipeAPIResponse } from '../../_interfaces/recipe.interface';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CamelCaseToSpacePipe],
  templateUrl: './category.card.component.html',
  styleUrl: './category.card.component.scss'
})
export class CategoryCardComponent {

  @Input() cuisineType: string = "Cuisine Type";
  @Input() cuisineTypeValue: string = "";
  @Output() recipeByCuisineTypeEmitter = new EventEmitter<any>();

  data: RecipeAPIResponse[] = [];

  constructor(private recipeService: RecipeServiceService) { }


  getRecipesByMealType() {
    this.recipeService.getRecipesByCuisineType(this.cuisineTypeValue).subscribe((data) => {
      this.data?.push(data);
      this.recipeByCuisineTypeEmitter.emit(this.data);
    });

  }
}
