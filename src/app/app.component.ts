import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './Services/AuthService/auth-service.service';
import { Router, NavigationEnd } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentRoute: string = '';

  constructor(private authService: AuthServiceService, private router: Router) {
    // Écoute les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
      }
    });
  }

  ngOnInit(): void {
    //
  }

  isAdminRoute(): boolean {
    // Liste des routes d'administration
    const adminRoutes = [
      '/accueil', 
      '/user', 
      '/burger', 
      '/order', 
      '/payment', 
      '/addUser', 
      '/updateUser', 
      '/detailsUser', 
      '/addBurger', 
      '/updateBurger', 
      '/detailsBurger', 
      '/archivedBurger', 
      '/detailsPayments', 
      '/detailsOrders',
      'updateUser/:id',
      'detailsUser/:id',
      'detailsPayments/:id',
      'detailsOrders/:id',
      'updateBurger/:id',
      'detailsBurger/:id',
    ];

    // Vérifie si la route actuelle est dans la liste des routes d'administration
    return adminRoutes.includes(this.currentRoute);
  }

  isCatalogRoute(): boolean {
    // Liste des routes du catalogue
    const catalogRoutes = [
      '/', 
      '/login',
      '/about',
      '/contact'
    ];
    return catalogRoutes.includes(this.currentRoute);
  }
}
