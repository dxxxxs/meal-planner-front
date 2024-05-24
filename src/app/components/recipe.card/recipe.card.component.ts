import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Hit, Nutrient, Recipe } from '../../_interfaces/recipe.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';
import { StorageServiceService } from '../../_services/storage.service.service';
import { Router } from '@angular/router';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { AlertService } from '../../_services/alert.service';
import { CommonModule, DecimalPipe, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Plan, PlanObject } from '../../_interfaces/plan';

@Component({
  selector: 'app-recipecard',
  standalone: true,
  imports: [
    ModalRecipeComponent,
    DecimalPipe,
    TitleCasePipe,
    CommonModule,
    ReactiveFormsModule
  ],
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

  @Output() showModalEmitter = new EventEmitter<any>();
  @Output() addedToPlanner = new EventEmitter<any>();
  @Output() removedFromPlanner = new EventEmitter<any>();

  @Input() data?: Recipe;
  @Input() isOnPlanner: boolean = false;
  @Input() isInPlanner: boolean = false;
  @Input() weight: number = 100;
  @Input() idOnPlan: string = "";


  query = new FormControl();

  constructor(private storageService: StorageServiceService, private router: Router, private recipeService: RecipeServiceService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.query.setValue(this.weight);
    this.query.valueChanges.subscribe(value => {
      if (value < 0) {
        this.query.setValue(0);
      }
      this.weight = this.query.value;
    });
  }
  isLiked: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.storageService.isLoggedIn() && changes['data'] && this.data) {
      this.recipeService.recipeInLikes(this.data.label).subscribe((res) => {
        this.isLiked = res.isLiked;
      });
    }
  }

  showModal() {
    this.showModalEmitter.emit(this.data);
  }

  @ViewChild('modalButton') modalButton!: ElementRef;

  likeRecipeMessage: string = "";

  likeRecipe() {
    if (this.storageService.isLoggedIn() && this.data) {
      this.recipeService.likeRecipe(this.data).subscribe(
        (response: any) => {
          this.alertService.showAlert(false, response.message);
          this.isLiked = !this.isLiked;
        },
        (error: any) => {
          this.alertService.showAlert(true, error);
        }
      )
    } else {
      this.modalButton.nativeElement.click();
    }
  }

  sendToSignIn() {
    this.router.navigate(['/login']);
  }

  sendToSignUp() {
    this.router.navigate(['/register']);
  }


  calculateCalories(weight: number): number {
    let calories = 0;
    if (this.data) {
      calories = (this.data.calories * weight) / this.data.totalWeight;
    }
    return calories;
  }
  calculateCarbs(weight: number): number {
    let carbs = 0;
    if (this.data) {
      carbs = (this.data.totalNutrients.CHOCDF.quantity * weight) / this.data.totalWeight;
    }
    return carbs;
  }
  calculateProteins(weight: number): number {
    let proteins = 0;
    if (this.data) {
      proteins = (this.data.totalNutrients.PROCNT.quantity * weight) / this.data.totalWeight;
    }
    return proteins;
  }
  calculateFats(weight: number): number {
    let fats = 0;
    if (this.data) {
      fats = (this.data.totalNutrients.FAT.quantity * weight) / this.data.totalWeight;
    }
    return fats;
  }


  removeFromPlanner() {
    this.recipeService.saveRecipe(this.data).subscribe((res => {
      this.removedFromPlanner.emit(res._id);
    }))
  }

  addToPlanner() {
    this.recipeService.saveRecipe(this.data).subscribe((res => {
      let obj: PlanObject = {
        recipe: res._id,
        quantity: this.weight
      }
      this.addedToPlanner.emit(obj);
    }))
  }


  updateWeight() {
    this.addToPlanner();
  }
}
