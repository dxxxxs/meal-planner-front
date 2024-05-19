import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Hit, Nutrient, Recipe } from '../../_interfaces/recipe.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ModalRecipeComponent } from '../modal-recipe/modal-recipe.component';
import { StorageServiceService } from '../../_services/storage.service.service';
import { Router } from '@angular/router';

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
  @Input() data?: Hit;
  @Output() showModalEmitter = new EventEmitter<any>();


  constructor(private storageService:StorageServiceService, private router: Router){}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.data);
  }

  showModal() {
    this.showModalEmitter.emit(this.data);
  }

  @ViewChild('modalButton') modalButton!: ElementRef;

  likeRecipe(){
    if(this.storageService.isLoggedIn()){

    }else{
      this.modalButton.nativeElement.click();
    }
  }

  sendToSignIn(){
this.router.navigate(['/login']);
}

sendToSignUp(){
    this.router.navigate(['/register']);

  }
}
