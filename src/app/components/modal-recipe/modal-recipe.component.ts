import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-recipe',
  standalone: true,
  imports: [],
  templateUrl: './modal-recipe.component.html',
  styleUrl: './modal-recipe.component.scss'
})
export class ModalRecipeComponent {
  @Input() recipeData : any = "";
}
