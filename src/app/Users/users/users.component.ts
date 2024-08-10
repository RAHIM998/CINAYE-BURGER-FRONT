import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/Users/users';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})


export class UsersComponent implements OnInit{

  tabEtudiant: Users[] = [];


  constructor(private userService: UserServiceService){}


  ngOnInit(): void {
    this.getTabUsers();
  }


  //Récupération de la liste des utilisateurs 
  getTabUsers() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.tabEtudiant = response.data;
      },
      (error) => {
        console.log(error);
      }
    )
  }

    
  //Suppression d'utilisateur
  DelUser(id: any) {
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
        this.userService.DeleteUser(id).subscribe(
          (response) => { 
            Swal.fire({
              title: 'Supprimé!',
              text: "L'utilisateur a été supprimé.",
              icon: 'success',
              confirmButtonColor: '#007BFF' 
            });
            this.getTabUsers();
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