import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiResponse } from 'src/app/model/Burgers/burgerResponse.model';
import { PaginatedResponse } from 'src/app/model/Burgers/burgerResponse.model';
import { Burgers } from 'src/app/model/Burgers/burgers';

@Injectable({
  providedIn: 'root'
})
export class BurgerServiceService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/burgers';

  // Requête de récupération de la liste des burgers
  getAllBurgers(page: number = 1): Observable<ApiResponse<PaginatedResponse<Burgers>>> {
    return this.http.get<ApiResponse<PaginatedResponse<Burgers>>>(`${this.apiUrl}?page=${page}`);
  }


  //Requette de suppression des utilisateurs
  DeleteBurger(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  


  //Méthode de sauvegarde des données
  addBerger(burger: FormData): Observable<Burgers> {
    return this.http.post<Burgers>(this.apiUrl, burger);
  }

  //Recupértion de l'utilisateur via son id
  getBurgerById(id:number): Observable<ApiResponse<Burgers>> {
    return this.http.get<ApiResponse<Burgers>> (`${this.apiUrl}/${id}`)
  }

  //Méthode de mis à jour des données 
  updateBurger(burger: FormData, id: number): Observable<Burgers> {
    return this.http.put<Burgers>(`${this.apiUrl}/${id}`, burger, {
      headers: new HttpHeaders({
        'Accept': 'application/json'
      })
    });
  }
  
  //Méthode de recupération des burgers archivés
  getAllBurgersArchived(): Observable<ApiResponse<Burgers[]>> {
    return this.http.get<ApiResponse<Burgers[]>>("http://127.0.0.1:8000/api/burgers/trashed");
  }
  

  //Méthode de desarchive du berger 
  DesarchiveBurger(id: number) {
    return this.http.get("http://127.0.0.1:8000/api/burgers/trashed/" + id);
  }
}
