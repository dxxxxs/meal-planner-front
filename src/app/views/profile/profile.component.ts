import { Component } from '@angular/core';
import { StorageServiceService } from '../../_services/storage.service.service';
import { UserServiceService } from '../../_services/user.service.service';
import { Recipe } from '../../_interfaces/recipe.interface';
import { RecipeCardComponent } from '../../components/recipe.card/recipe.card.component';
import { ModalRecipeComponent } from '../../components/modal-recipe/modal-recipe.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RecipeCardComponent, ModalRecipeComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: StorageServiceService, private userService: UserServiceService, private router:Router) { }


  likes?:Recipe[];

  ngOnInit(): void {
    if (!this.storageService.isLoggedIn()) {
      window.location.assign('/');
    }
    this.currentUser = this.storageService.getUser();
    this.userService.getUserLikes().subscribe((res) => {
      this.likes = res.userLikes;
    });

  }



  isSetModalData: boolean = false;
  modalData?: Recipe;

  updateModalData(data: any) {
    this.isSetModalData = true;
    this.modalData = data;
  }
}
