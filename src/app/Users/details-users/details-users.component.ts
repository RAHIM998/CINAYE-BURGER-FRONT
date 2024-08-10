import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from 'src/app/model/Users/user-response.model';
import { Users } from 'src/app/model/Users/users';
import { UserServiceService } from 'src/app/Services/UserService/user-service.service';

@Component({
  selector: 'app-details-users',
  templateUrl: './details-users.component.html',
  styleUrls: ['./details-users.component.css']
})
export class DetailsUsersComponent implements OnInit{

  id: number | null = null;
  user: Users | null = null;
  error: string | null = null;



  constructor(
    private userService: UserServiceService, 
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if(this.id){
      this.userService.getUserById(this.id).subscribe(
        (response : ApiResponse)=>{
          this.user = response.data;
          
        },
        (error)=>{
          this.error = 'Erreur lors de la récupération des détails de l\'utilisateur.';
        }
      )
    }
  }

}
