import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Hit, Nutrient, Recipe } from '../../_interfaces/recipe.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';
import { StorageServiceService } from '../../_services/storage.service.service';
import { Router } from '@angular/router';
import { RecipeServiceService } from '../../_services/recipe.service.service';
import { AlertService } from '../../_services/alert.service';

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
  @Input() data?: Recipe;
  @Output() showModalEmitter = new EventEmitter<any>();


  constructor(private storageService: StorageServiceService, private router: Router, private recipeService: RecipeServiceService, private alertService: AlertService) { }


  isLiked: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.recipeService.recipeInLikes(this.data.label).subscribe((res) => { 
        console.log(res);
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
          console.log(response);
        },
        (error: any) => {
          this.alertService.showAlert(true, error);
          console.log(error);
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
}
