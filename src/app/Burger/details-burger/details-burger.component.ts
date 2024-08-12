import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Burgers } from 'src/app/model/Burgers/burgers';
import { Users } from 'src/app/model/Users/users';
import { BurgerServiceService } from 'src/app/Services/BurgerServices/burger-service.service';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-details-burger',
  templateUrl: './details-burger.component.html',
  styleUrls: ['./details-burger.component.css']
})
export class DetailsBurgerComponent implements OnInit{

  id: number | null = null;
  burger: Burgers | null = null;
  error: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;


  constructor(
    private burgerservicer: BurgerServiceService, 
    private route: ActivatedRoute
  ){}


  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.burgerservicer.getBurgerById(this.id).subscribe(
        (response) => {
          if (response.success) {          
            this.burger = response.data;
            console.log('Données reçues', this.burger);
          } else {
            console.error('Erreur :', response.message);
          }
        },
        (error) => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    }
  }

}
