import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../_services/alert.service';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {
  error = false;
  message = '';

  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.showAlert$.subscribe(data => {
      this.error = data.error;
      this.message = data.message;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
