import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { RecipeCardComponent } from '../recipe.card/recipe.card.component';
import { DecimalPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { RemoveWhitespacesPipe } from '../../_pipes/remove-whitespaces.pipe';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { Recipe, RecipeAPIRequest, RecipeAPIResponse } from '../../_interfaces/recipe.interface';
import { ModalBusquedaComponent } from '../modal-busqueda/modal-busqueda.component';
import { Plan, PlanObject } from '../../_interfaces/plan';

@Component({
  selector: 'app-planner-meal',
  standalone: true,
  imports: [
    RecipeCardComponent,
    RemoveWhitespacesPipe,
    ModalBusquedaComponent,
    TitleCasePipe,
    DecimalPipe
  ],
  templateUrl: './planner-meal.component.html',
  styleUrl: './planner-meal.component.scss'
})
export class PlannerMealComponent {

  @Input() meal: string = "";
  @Input() mealType: string[] = [];
  @Input() isLunch: boolean = false;
  @Input() isDinner: boolean = false;
  @Input() planData?: PlanObject[] = [];

  @Output() addedToPlanner = new EventEmitter<any>();
  @Output() removedFromPlanner = new EventEmitter<any>();
  @Output() showModalEmitter = new EventEmitter<any>();

  data: PlanObject[] = [];

  constructor(private recipeService: RecipeServiceService) { }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['planData'] && !changes['planData'].firstChange) {
      this.data?.splice(0, this.data.length);
      if(this.planData?.length == 0){
        this.updateTotalMacros();
      }
      this.planData?.forEach(e => {
        this.recipeService.getRecipeById(e.recipe).subscribe((res) => {
          let recipe: Recipe = res.recipe;
          let planItem: PlanObject = {
            quantity: e.quantity,
            _id: e._id,
            recipeData: recipe,
            recipe: e.recipe
          };
          this.data?.push(planItem);
          this.updateTotalMacros();
        })
      })
    }
  }

  weight: number = 100;

  totalCalories = 0;
  totalCarbs = 0;
  totalProteins = 0;
  totalFats = 0;

  calculateCalories(){
    this.data?.forEach(e => {
      console.log(e);
      if (e.recipeData) {
        this.totalCalories += (e.recipeData.calories * e.quantity) / e.recipeData.totalWeight;
      }
    })
  }
  calculateCarbs() {
    this.data?.forEach(e => {
      if (e.recipeData) {
        this.totalCarbs += (e.recipeData.totalNutrients.CHOCDF.quantity * e.quantity) / e.recipeData.totalWeight;
      }
    })

  }
  calculateProteins() {
    this.data?.forEach(e => {
      if (e.recipeData) {
        this.totalProteins += (e.recipeData.totalNutrients.PROCNT.quantity * e.quantity) / e.recipeData.totalWeight;
      }
    })
  }
  calculateFats() {
    this.data?.forEach(e => {
      if (e.recipeData) {
        this.totalFats += (e.recipeData.totalNutrients.FAT.quantity * e.quantity) / e.recipeData.totalWeight;
      }
    })
  }

  updateTotalMacros(){
    this.totalCalories = 0;
    this.totalCarbs = 0;
    this.totalProteins = 0;
    this.totalFats = 0;
    this.calculateCalories();
    this.calculateCarbs();
    this.calculateProteins();
    this.calculateFats();
    
  }

  removeFromPlanner(id: string) {
    if (this.planData) {
      let data = [...this.planData];

      const index = data?.findIndex(e => e.recipe === id);
      if (index !== -1) {
        data?.splice(index, 1);
      }

      let emitData = {
        data: data,
        meal: this.meal
      }
      this.removedFromPlanner.emit(emitData);
    }

  }

  addToPlanner(id: PlanObject) {
    if (this.planData) {
      let data = [...this.planData];

      const index = data?.findIndex(e => e.recipe === id.recipe);
      if (index == -1) {
        let obj:PlanObject = {
          recipe:id.recipe,
          quantity:id.quantity
        }
        data?.push(obj);
      }else{
        data[index].quantity = id.quantity;

      }

      let emitData = {
        data: data,
        meal: this.meal
      }
      this.removedFromPlanner.emit(emitData);
    }

  }


  updateModalData(data: Recipe) {
    this.showModalEmitter.emit(data);
  }


}
