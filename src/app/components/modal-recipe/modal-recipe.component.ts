import { DecimalPipe, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Digest, Hit, Recipe } from '../../_interfaces/recipe.interface';

@Component({
  selector: 'app-modal-recipe',
  standalone: true,
  imports: [DecimalPipe, TitleCasePipe],
  templateUrl: './modal-recipe.component.html',
  styleUrl: './modal-recipe.component.scss'
})
export class ModalRecipeComponent {
  @Input() recipeData?: Recipe;

  calculate(totalWeight: any, nutrient: any) {
    return (100 * nutrient) / totalWeight;
  }
}
