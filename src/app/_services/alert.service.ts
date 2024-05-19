import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private showAlertSubject = new Subject<{ error: boolean, message: string }>();
  showAlert$ = this.showAlertSubject.asObservable();

  constructor() { }

  showAlert(error: boolean, message: string): void {
    this.showAlertSubject.next({ error, message });
  }
}
