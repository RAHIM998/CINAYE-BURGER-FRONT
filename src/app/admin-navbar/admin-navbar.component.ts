import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../Services/AuthService/auth-service.service';
import { NavigationEnd, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit{

  showNavbar: boolean = true;

  constructor(
    private authService: AuthServiceService, 
    private router: Router){
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          // Masquer la barre de navigation sur la page de connexion
          this.showNavbar = !['/login'].includes(event.url);
        }
      });
    
    }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }




  title = 'CinayeBurger';

  //Méthode de déconnexion 
  logout(): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous allez vous déconnecter de votre compte.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, déconnectez-moi !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout().subscribe({
          next: (response) => {
            Swal.fire(
              'Déconnecté !',
              response.message,
              'success'
            );
            localStorage.removeItem('auth_token'); // Supprime le token du localStorage
            this.router.navigate(['/login']); // Redirige vers la page de connexion
          },
          error: (error) => {
            Swal.fire(
              'Erreur',
              'Une erreur est survenue lors de la déconnexion.',
              'error'
            );
            console.error('Erreur de déconnexion', error); // Affiche l'erreur
          }
        });
      }
    });
  }
}
