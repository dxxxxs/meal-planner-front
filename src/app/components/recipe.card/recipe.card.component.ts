import { Component, Input, SimpleChanges } from '@angular/core';
import { Nutrient } from '../../_interfaces/recipe.interface';

@Component({
  selector: 'app-recipecard',
  standalone: true,
  imports: [],
  templateUrl: './recipe.card.component.html',
  styleUrl: './recipe.card.component.scss'
})
export class RecipeCardComponent {

  math = Math;
  @Input() name: string = "";
  @Input() caloriesString: string = "0";
  @Input() img: string = "";
  @Input() nutrients: Nutrient[] = [];
  @Input() dietLabels: string[] = [];

  nutrientsMap:any;
  calories: number = 0;
  protein: Nutrient = { label:"",quantity:0 ,unit: "" };
  carbs: Nutrient = { label:"",quantity:0 ,unit: "" };
  fat: Nutrient = { label:"",quantity:0 ,unit: "" };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['caloriesString'] && changes['caloriesString'].currentValue) {
      this.calories = Math.round(parseInt(changes['caloriesString'].currentValue));
    }
    if (changes['caloriesString'] && changes['caloriesString'].currentValue) {
      this.calories = Math.round(parseInt(changes['caloriesString'].currentValue));
    }
    if (changes['caloriesString'] && changes['caloriesString'].currentValue) {
      this.calories = Math.round(parseInt(changes['caloriesString'].currentValue));
    }
    this.nutrientsMap = new Map(Object.entries(this.nutrients));
    this.fat = this.nutrientsMap.get("FAT");
    this.carbs = this.nutrientsMap.get("CHOCDF");
    this.protein = this.nutrientsMap.get("PROCNT");
  }
}
