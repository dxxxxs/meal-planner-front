import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { EventBusService } from '../../_shared/event-bus.service';
import { AuthServiceService } from '../../_services/auth.service.service';
import { StorageServiceService } from '../../_services/storage.service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn = false;

  username?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageServiceService,
    private authService: AuthServiceService,
    private eventBusService: EventBusService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        this.storageService.clean();
        this.router.navigate(['']);
        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
