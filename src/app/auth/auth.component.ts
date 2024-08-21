import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/AuthService/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null; 
  formSubmitted = false; 

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    const { email, password } = this.loginForm.value;
    

    this.authService.login(email, password).subscribe(
      (response) => {
        console.log('Response:', response); 
        if (response.success) {
          this.router.navigate(['/accueil']);
        } else {
          this.errorMessage = response.message; 
        }
      },
      (error) => {
        this.errorMessage = 'Email et/ou mot de passe incorrect !'; 
        console.error('Error:', error); 
      }
    );
  }
}
