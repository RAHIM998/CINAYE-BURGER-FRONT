import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersData, ApiResponse, Orders } from 'src/app/model/Orders/orders'; // Assure-toi du chemin correct

@Injectable({
  providedIn: 'root'
})
export class AccueilServiceService {

  private baseUrl = 'http://127.0.0.1:8000/api/order';

  constructor(private http: HttpClient) {}

  CommandeValideJournee(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/dailyPaidOrders`);
  }

  CommadeEnCoursJournee(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/dailyPendingOrders`);
  }

  CommandeAnnulerJournée(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.baseUrl}/dailyCancelledOrders`);
  }

  // accueil-service.service.ts
  VentesMensuelles(): Observable<{success: boolean, message: string, data: Orders[]}> {
    return this.http.get<{success: boolean, message: string, data: Orders[]}>(`${this.baseUrl}/monthlySales`);
  }

}
