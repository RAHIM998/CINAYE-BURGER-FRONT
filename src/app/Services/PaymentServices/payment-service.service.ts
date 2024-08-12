import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payments } from 'src/app/model/Payments/payments';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http : HttpClient) { }

  private apiUrl = 'http://127.0.0.1:8000/api/payment';


   // Requête de récupération de la liste des burgers
   getAllPayments(): Observable <{ success: boolean, message: string, data: Payments[] }>{
    return this.http.get<{ success: boolean, message: string, data: Payments[] }>(this.apiUrl);
  }


  //Paiements du jour 
  getPaymentsForToday(): Observable <{ success: boolean, message: string, data: Payments[] }>{
    return this.http.get<{ success: boolean, message: string, data: Payments[] }>("http://127.0.0.1:8000/api/payment/daily");
  }
    // Récupération d'un paiement par son ID
    getPaymentById(id: number): Observable<{ success: boolean, message: string, data: Payments }> {
      return this.http.get<{ success: boolean, message: string, data: Payments }>(`${this.apiUrl}/${id}`);
    }

}

  
