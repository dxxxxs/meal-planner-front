import { Component } from '@angular/core';
import { RecipeCardComponent } from '../../components/recipe.card/recipe.card.component';
import { SliderComponent } from '../../components/slider/slider.component';
import { RecipeAPIResponse } from '../../_interfaces/recipe.interface';
import { RecipeServiceService } from '../../_services/recipe.service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RecipeCardComponent,
    SliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  data: RecipeAPIResponse[] = [];

  constructor(private recipeService: RecipeServiceService) {
    recipeService.getRecipes().subscribe((res) => {
      this.data?.push(res);
    });
  }

  loadNextRecipes() {
    if (this.data !== undefined) {
      this.recipeService.getNextRecipes(this.data[this.data.length - 1]._links.next.href).subscribe((res) => {
        this.data?.push(res);
      });
    }
  }

  loadNextRandomRecipes() {
    if (this.data !== undefined) {
      this.recipeService.getRecipes().subscribe((res) => {
        this.data?.push(res);
      });
    }
  }
}
