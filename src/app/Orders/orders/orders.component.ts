import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/model/Orders/orders';
import { OrderServiceService } from 'src/app/Services/OrderServices/order-service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  TabOrders: Orders[] = [];
  error: string | null = null;

  constructor(private orderService: OrderServiceService) { }

  ngOnInit(): void {
    this.loadAllOrders();
  }

  // Méthode pour charger toutes les commandes
  loadAllOrders(): void {
    this.orderService.getAllOrders().subscribe(
      (response) => {
        console.log(response);
        this.TabOrders = response.data;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des commandes.';
      }
    );
  }

  // Méthode pour changer le filtre en fonction du bouton cliqué
  changeFilter(filter: string): void {
    if (filter === 'today') {
      this.loadOrdersByType('daily');
    } else if (filter === 'pending') {
      this.loadOrdersByType('pending');
    } else {
      this.loadAllOrders();
    }
  }

  // Méthode pour charger les commandes par type
  private loadOrdersByType(type: string): void {
    this.orderService.getOrdersByType(type).subscribe(
      (response) => {
        console.log(response);
        this.TabOrders = response.data;
      },
      (error) => {
        this.error = 'Erreur lors de la récupération des commandes.';
      }
    );
  }
}
