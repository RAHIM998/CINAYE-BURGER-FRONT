import { Component, OnInit } from '@angular/core';
import { Payments } from 'src/app/model/Payments/payments';
import { PaymentServiceService } from 'src/app/Services/PaymentServices/payment-service.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  TabPayment: Payments[] = [];
  showTotal: boolean = false;

  constructor(private paymentService: PaymentServiceService) { }

  ngOnInit(): void {
    this.getTabPaiement();
  }

  getTabPaiement() {
    this.paymentService.getAllPayments().subscribe(
      (response) => {
        this.TabPayment = response.data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements:', error);
      }
    );
  }

  loadTodayPayments(): void {
    this.paymentService.getPaymentsForToday().subscribe(
      (response) => {
        this.TabPayment = response.data;
        this.showTotal = true;
      },
      (error) => {
        console.error('Erreur lors de la récupération des paiements du jour:', error);
      }
    );
  }

  getTotalAmount(): number {
    return this.TabPayment.reduce((total: number, paie: Payments) => total + parseFloat(paie.amountOrder), 0);
  }
}
