import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Orders } from 'src/app/model/Orders/orders';
import { OrderServiceService } from 'src/app/Services/OrderServices/order-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-orders',
  templateUrl: './details-orders.component.html',
  styleUrls: ['./details-orders.component.css']
})
export class DetailsOrdersComponent implements OnInit {

  id: number | null = null;
  order: Orders | null = null;
  error: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderServiceService,
    private router: Router 
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.loadOrder();
    } else {
      this.error = 'ID de commande invalide.';
    }
  }

  loadOrder() {
    if (this.id) {
      this.orderService.getOrderById(this.id).subscribe(
        (response) => {
          if (response.success && response.data) {
            this.order = response.data;
          } else {
            this.error = response.message || 'Détails de la commande non trouvés.';
          }
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des détails de la commande.';
          console.error('Erreur:', error);
        }
      );
    }
  }

  UpdateStatut(id: number, statut: string) {

    this.orderService.UpdateStatut(id, statut).subscribe(
      (response) => {
        if (statut === 'paid') {
          Swal.fire({
            title: 'Confirmée!',
            text: "La commande a été confirmée avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF'
          });
        } else if (statut === 'cancelled') {
          Swal.fire({
            title: 'Annulée!',
            text: "La commande a été annulée avec succès.",
            icon: 'success',
            confirmButtonColor: '#007BFF'
          }).then(() => {
            // Navigate to orders page after successful cancellation
            this.router.navigate(['/order']);
          });
        }

        console.log('Statut mis à jour avec succès:', response);
        this.errorMessage = null; 

        // Recharger les détails de la commande après la mise à jour
        this.loadOrder();
      },
      (error) => {
        Swal.fire({
          title: 'Erreur!',
          text: "Une erreur est survenue lors de la mise à jour du statut.",
          icon: 'error',
          confirmButtonColor: '#007BFF'
        });
        console.error('Erreur lors de la mise à jour du statut:', error);
        this.errorMessage = error;
      }
    );
  }

}
