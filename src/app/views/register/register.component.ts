import { Component } from '@angular/core';
import { AuthServiceService } from '../../_services/auth.service.service';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(private authService: AuthServiceService) {
  }

  onSubmit() {
    if (this.form.valid) {
      let username = this.form.controls['username']?.value;
      let email = this.form.get('email')?.value;
      let password = this.form.get('password')?.value;
      if (username && email && password) {
        this.authService.register(username, email, password).subscribe({
          next: data => {
            console.log(data);
            this.isSuccessful = true;
            this.isSignUpFailed = false;
          },
          error: err => {
            this.errorMessage = err.error.message;
            this.isSignUpFailed = true;
          }
        });
      }
    } else {
      this.isSignUpFailed = true;
    }
  }
}
