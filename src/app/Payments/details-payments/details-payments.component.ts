import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Payments } from 'src/app/model/Payments/payments';
import { PaymentServiceService } from 'src/app/Services/PaymentServices/payment-service.service';

@Component({
  selector: 'app-details-payments',
  templateUrl: './details-payments.component.html',
  styleUrls: ['./details-payments.component.css']
})
export class DetailsPaymentsComponent implements OnInit {

  id: number | null = null;
  payment: Payments | null = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentServiceService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    if (this.id) {
      this.paymentService.getPaymentById(this.id).subscribe(
        (response) => {
          // Assurez-vous que la réponse contient un seul objet Payments
          if (response.success && response.data) {
            this.payment = response.data;
          } else {
            this.error = response.message || 'Détails du paiement non trouvés.';
          }
        },
        (error) => {
          this.error = 'Erreur lors de la récupération des détails du paiement.';
          console.error('Erreur:', error);
        }
      );
    } else {
      this.error = 'Identifiant de paiement invalide.';
    }
  }
}
