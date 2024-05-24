import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RecipeCardComponent } from '../recipe.card/recipe.card.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Recipe, RecipeAPIResponse } from '../../_interfaces/recipe.interface';
import { StorageServiceService } from '../../_services/storage.service.service';
import { UserServiceService } from '../../_services/user.service.service';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { PlanObject } from '../../_interfaces/plan';

@Component({
  selector: 'app-modal-busqueda',
  standalone: true,
  imports: [
    RecipeCardComponent,
    TitleCasePipe,
    ModalRecipeComponent,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './modal-busqueda.component.html',
  styleUrl: './modal-busqueda.component.scss'
})
export class ModalBusquedaComponent {
  @Input() mealType: string[] = [];
  @Input() isLunch: boolean = false;
  @Input() isDinner: boolean = false;

  @Output() showModalEmitter = new EventEmitter<any>();

  @Output() addedToPlanner = new EventEmitter<any>();
  currentUser: any;

  constructor(private storageService: StorageServiceService, private userService: UserServiceService, private recipeService: RecipeServiceService) { }


  likes?: Recipe[];

  query = new FormControl();

  data: RecipeAPIResponse[] = [];

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserLikes().subscribe((res) => {
      this.likes = res.userLikes;
    });

    this.recipeService.getRecipesByMealType(this.mealType).subscribe((res) => {
      this.data?.push(res);
    });
  }

  updateModalData(data: Recipe) {
    this.showModalEmitter.emit(data);
  }

  addToPlanner(id: PlanObject) {
    console.log("ey");
    this.addedToPlanner.emit(id);
  }

  getRecipeByQuery(){
    this.data = [];
    this.recipeService.getRecipesByText(this.mealType,this.query.value).subscribe(
      (res) => {
        this.data?.push(res);
      }

    )
  }
}
