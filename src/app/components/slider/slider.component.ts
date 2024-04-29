import { Component, Input } from '@angular/core';
import { CategoryCardComponent } from '../category.card/category.card.component';
import { CuisineType } from '../../_interfaces/cuisine-type';
import { DishType } from '../../_interfaces/dish-type';



@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [CategoryCardComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {

  @Input() sliderType: string = "CUISINE"; //"DISH" or "CUISINE"

  cuisineTypes: string[] = Object.keys(CuisineType);
  dishTypes: string[] = Object.keys(DishType);


}
