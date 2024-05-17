import { Component } from '@angular/core';
import { StorageServiceService } from '../../_services/storage.service.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  currentUser: any;

  constructor(private storageService: StorageServiceService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
