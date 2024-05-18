import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Nutrient } from '../../_interfaces/recipe.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';

@Component({
  selector: 'app-recipecard',
  standalone: true,
  imports: [ModalRecipeComponent],
  templateUrl: './recipe.card.component.html',
  styleUrl: './recipe.card.component.scss',
  animations: [

    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class RecipeCardComponent {

  math = Math;
  @Input() data: any = "";
  @Output() showModalEmitter = new EventEmitter<any>();


  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.data);
  }

  showModal() {
    this.showModalEmitter.emit(this.data);
  }
}
