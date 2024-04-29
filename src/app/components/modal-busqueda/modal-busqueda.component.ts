import { Component, Input } from '@angular/core';
import { RecipeCardComponent } from '../recipe.card/recipe.card.component';

@Component({
  selector: 'app-modal-busqueda',
  standalone: true,
  imports: [
    RecipeCardComponent
  ],
  templateUrl: './modal-busqueda.component.html',
  styleUrl: './modal-busqueda.component.scss'
})
export class ModalBusquedaComponent {
  @Input() mealName: string = "Meal";
}
