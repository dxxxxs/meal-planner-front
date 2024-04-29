import { Component, Input } from '@angular/core';
import { CamelCaseToSpacePipe } from '../../_pipes/camel-case-to-space.pipe';

@Component({
  selector: 'app-category-card',
  standalone: true,
  imports: [CamelCaseToSpacePipe],
  templateUrl: './category.card.component.html',
  styleUrl: './category.card.component.scss'
})
export class CategoryCardComponent {

  @Input() cuisineType: string = "Cuisine Type";

}
