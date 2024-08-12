import { Component, OnInit } from '@angular/core';
import { Burgers } from 'src/app/model/Burgers/burgers';
import { ApiResponse } from 'src/app/model/Burgers/burgerResponse.model';
import { PaginatedResponse } from 'src/app/model/Burgers/burgerResponse.model';
import { BurgerServiceService } from 'src/app/Services/BurgerServices/burger-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-burger',
  templateUrl: './burger.component.html',
  styleUrls: ['./burger.component.css']
})
export class BurgerComponent implements OnInit {

  TabBurger: Burgers[] = [];  
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private burgerService: BurgerServiceService) {}

  ngOnInit(): void {
    this.loadBurgers(this.currentPage);
  }

  // Récupération de la liste des burgers
  loadBurgers(page: number): void {
    this.burgerService.getAllBurgers(page).subscribe(
      (response: ApiResponse<PaginatedResponse<Burgers>>) => {
        this.TabBurger = response.data.data;
        this.currentPage = response.data.current_page;
        this.totalPages = response.data.last_page;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.loadBurgers(page);
    }
  }

  //Méthode de suppression des burgers 
  Deleteburger(id: any) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007BFF',  
      cancelButtonColor: '#d33',  
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Annuler',
      background: '#f0f0f0', 
    }).then((result) => {
      if (result.isConfirmed) {
        this.burgerService.DeleteBurger(id).subscribe(
          (response) => { 
            Swal.fire({
              title: 'Supprimé!',
              text: "Le burger a été supprimé avec succès.",
              icon: 'success',
              confirmButtonColor: '#007BFF' 
            });
            this.loadBurgers(this.currentPage);
          },
          (error) => {
            Swal.fire({
              title: 'Erreur!',
              text: "Une erreur est survenue.",
              icon: 'error',
              confirmButtonColor: '#007BFF'  
            });
            console.log(error);
          }
        )
      }
    });
  }


}
