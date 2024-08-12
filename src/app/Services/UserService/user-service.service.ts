import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Users } from 'src/app/model/Users/users';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/model/Users/user-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpclient: HttpClient) { }

  //Requette de recupération de la liste des utilisateurs 
  getAllUsers(): Observable<{ success: boolean, message: string, data: Users[] }> {
    return this.httpclient.get<{ success: boolean, message: string, data: Users[] }>("http://127.0.0.1:8000/api/user");
  }

  //Requette de suppression des utilisateurs
  DeleteUser(id:number){
    return this.httpclient.delete("http://127.0.0.1:8000/api/user/"+ id);
  }

  //Méthode de sauvegarde des données
  addUser(user: Users): Observable<Users> {
    return this.httpclient.post<Users>("http://127.0.0.1:8000/api/user/", user).pipe(
      catchError(error => throwError(error))
    );
  }

  //Recupértion de l'utilisateur via son id
  getUserById(id:number): Observable<ApiResponse>{
    return this.httpclient.get<ApiResponse>("http://127.0.0.1:8000/api/user/"+ id)
  }

  //Méthode de mis à jour des données 
  updateUser(user: Users, id: number): Observable<Users> {
    return this.httpclient.put<Users>("http://127.0.0.1:8000/api/user/" + id, user).pipe(
      catchError(error => throwError(error))
    );
  }

}
