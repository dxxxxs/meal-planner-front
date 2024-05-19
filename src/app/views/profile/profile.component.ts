import { Component } from '@angular/core';
import { StorageServiceService } from '../../_services/storage.service.service';
import { UserServiceService } from '../../_services/user.service.service';
import { Recipe } from '../../_interfaces/recipe.interface';
import { RecipeCardComponent } from '../../components/recipe.card/recipe.card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RecipeCardComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: StorageServiceService, private userService: UserServiceService) { }


  likes?:Recipe[];

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.userService.getUserLikes().subscribe((res) => {
      this.likes = res.userLikes;
    });
  }
}
