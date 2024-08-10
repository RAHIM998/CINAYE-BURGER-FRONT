import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import { Users } from 'src/app/model/Users/users'; 
import { ApiResponse } from 'src/app/model/Users/user-response.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.css']
})
export class FormUsersComponent implements OnInit {

  userForm: FormGroup;
  id: number | null = null;

  constructor(
    private formBuilder: FormBuilder, 
    private userService: UserServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-ZÀ-ÿ\s'-]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?\d{1,4}[\s-]?\d+$/)]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    if (this.id) { 
      this.userService.getUserById(this.id).subscribe(
        (response: ApiResponse) => {
          const userData = response.data;
          console.log('Données reçues', userData);
          this.userForm.patchValue(userData); 

          this.userForm.get('password')?.clearValidators();
          this.userForm.get('confirmPassword')?.clearValidators();
          this.userForm.get('password')?.updateValueAndValidity();
          this.userForm.get('confirmPassword')?.updateValueAndValidity();
        }
      );
    } else {

      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(4)]);
      this.userForm.get('confirmPassword')?.setValidators([Validators.required]);

    }
  }

  // Fonction de validation personnalisée pour comparer les mots de passe
  passwordMatchValidator(formGroup: FormGroup): void {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (confirmPasswordControl?.value) {
      if (password !== confirmPassword) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    }
  }

  // Fonction d'ajout de l'utilisateur
  addUser() {
    const { confirmPassword, ...userData } = this.userForm.value;

    const newUser: Users = {
      ...userData,
      role: 'admin'
    };

    if (this.userForm.valid) {

      if(this.id){
        this.userService.updateUser(newUser, this.id, ).subscribe(
          (response) => {   
            Swal.fire({
              icon: 'success',
              title: 'Mise à jour réussie',
              text: 'Les informations de l\'utilisateur ont été mises à jour avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            this.router.navigate(['/user']);
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
          }
        )
      }else{
        this.userService.addUser(newUser).subscribe(
          (response) => {
            Swal.fire({
              icon: 'success',
              title: 'Utilisateur ajouté',
              text: 'Un nouvel utilisateur a été ajouté avec succès!',
              timer: 2000,
              showConfirmButton: false
            });
            console.log('Utilisateur ajouté avec succès', response);
            this.router.navigate(['/user']);
          },
          (error) => {
            console.log('Erreur lors de l\'ajout de l\'utilisateur', error);
          }
        );
      }  
    }
  }
}

