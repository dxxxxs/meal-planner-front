import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../../_services/auth.service.service';
import { StorageServiceService } from '../../_services/storage.service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';


  constructor(private authService: AuthServiceService, private storageService: StorageServiceService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      window.location.assign('/');
    }
  }

  onSubmit(): void {
    if (this.form.valid) {

      let username = this.form.controls['username']?.value;
      let password = this.form.controls['password']?.value;
      if (username && password) {
        this.authService.login(username, password).subscribe({
          next: data => {
            this.storageService.saveUser(data);
            this.storageService.saveToken(data.token);
            this.isLoginFailed = false;
            this.isLoggedIn = true;
            this.reloadPage();
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isLoginFailed = true;
          }
        });
      }
    }
  }

  reloadPage(): void {
    window.location.assign('/');
  }
}
