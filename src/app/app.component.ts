import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { RecipeServiceService } from './_services/recipe.service.service';
import { RecipeAPIResponse } from './_interfaces/recipe.interface';
import { RecipeCardComponent } from './components/recipe.card/recipe.card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RecipeCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  number = Number;
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
      })
    }
  }


}
