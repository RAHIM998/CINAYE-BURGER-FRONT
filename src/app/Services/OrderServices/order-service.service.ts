import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Orders } from 'src/app/model/Orders/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private apiUrl = 'http://127.0.0.1:8000/api/order';


  constructor(private http: HttpClient) {}

  getAllOrders(): Observable<{ success: boolean, message: string, data: Orders[] }> {
    return this.http.get<{ success: boolean, message: string, data: Orders[] }>(this.apiUrl).pipe(
      tap(response => console.log('Données de paiement:', response)));
  }


   // Méthode pour obtenir les commandes filtrées par type
   getOrdersByType(type: string): Observable<{ data: Orders[] }> {
    return this.http.get<{ data: Orders[] }>(`${this.apiUrl}/${type}`);
  }


  // Récupération d'unE commande par son ID
  getOrderById(id: number): Observable<{ success: boolean, message: string, data: Orders }> {
    return this.http.get<{ success: boolean, message: string, data: Orders }>(`${this.apiUrl}/${id}`).pipe(
      tap(response => console.log('Données de commande:', response))
    );
  }
  
  
  //Méthode de modification d'un statut 
  UpdateStatut(id: number, statut: string): Observable<{ success: boolean, message: string, data: Orders }> {
    return this.http.put<{ success: boolean, message: string, data: Orders }>(
      `http://127.0.0.1:8000/api/order/${id}/status`,
      { status: statut } // Utilisez 'status' pour correspondre au backend
    ).pipe(
      catchError(error => {
        let userFriendlyMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
        if (error.status === 403) {
          userFriendlyMessage = "Vous ne pouvez pas modifier une commande déjà payée !";
        } else if (error.status === 422) {
          userFriendlyMessage = "Transition de statut non autorisée.";
        } else if (error.status === 500) {
          userFriendlyMessage = "Erreur de serveur. Veuillez réessayer plus tard.";
        }
        console.error('Erreur lors de la mise à jour du statut:', error.error.message || error.message);
        return throwError(userFriendlyMessage);
      })
    );
  }
  
  


  /*/Requette de suppression des utilisateurs
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

*/

}
