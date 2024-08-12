import { Component, OnInit } from '@angular/core';
import { Burgers } from 'src/app/model/Burgers/burgers';
import { ApiResponse } from 'src/app/model/Burgers/burgerResponse.model';
import { BurgerServiceService } from 'src/app/Services/BurgerServices/burger-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archived-burger',
  templateUrl: './archived-burger.component.html',
  styleUrls: ['./archived-burger.component.css']
})
export class ArchivedBurgerComponent implements OnInit{

  TabBurgerArchived: Burgers[] = [];  

  constructor(private burgerService: BurgerServiceService) {}


  ngOnInit(): void {
    this.loadBurgersArchived();
  }

  loadBurgersArchived(): void {
    this.burgerService.getAllBurgersArchived().subscribe(
      (response: ApiResponse<Burgers[]>) => { 
        this.TabBurgerArchived = response.data;
        console.log(this.TabBurgerArchived);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  

    //Méthode de désarchivage des données 
    unarchiveBurger(id: any): void {
      this.burgerService.DesarchiveBurger(id).subscribe(
        (response) => { 
          Swal.fire({
            title: 'Supprimé!',
            text: "Le burger a été supprimé avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF' 
          });
          this.loadBurgersArchived();
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
      );
    }

}
