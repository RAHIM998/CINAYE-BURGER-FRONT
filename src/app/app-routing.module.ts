import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './Users/users/users.component';
import { BurgerComponent } from './Burger/burger/burger.component';
import { OrdersComponent } from './Orders/orders/orders.component';
import { PaymentsComponent } from './Payments/payments/payments.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import { FormUsersComponent } from './Users/form-users/form-users.component';
import { DetailsUsersComponent } from './Users/details-users/details-users.component';
import { FormBurgerComponent } from './Burger/form-burger/form-burger.component';
import { DetailsBurgerComponent } from './Burger/details-burger/details-burger.component';
import { ArchivedBurgerComponent } from './Burger/archived-burger/archived-burger.component';
import { DetailsPaymentsComponent } from './Payments/details-payments/details-payments.component';
import { DetailsOrdersComponent } from './Orders/details-orders/details-orders.component';
import { AuthComponent } from './auth/auth.component';
import { CatalogComponent } from './Catalogue/catalog/catalog.component';

const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'accueil', component: AccueilComponent },
  { path: 'user', component: UsersComponent },
  { path: 'burger', component: BurgerComponent },
  { path: 'order', component:  OrdersComponent},
  { path: 'payment', component:  PaymentsComponent},
  { path: 'addUser', component:  FormUsersComponent},
  { path: 'updateUser/:id', component:  FormUsersComponent},
  { path: 'detailsUser/:id', component:  DetailsUsersComponent},
  { path: 'addBurger', component:  FormBurgerComponent},
  { path: 'updateBurger/:id', component:  FormBurgerComponent},
  { path: 'detailsBurger/:id', component:  DetailsBurgerComponent},
  { path: 'archivedBurger', component:  ArchivedBurgerComponent},
  { path: 'detailsPayments/:id', component:  DetailsPaymentsComponent},
  { path: 'detailsOrders/:id', component:  DetailsOrdersComponent},
  { path: 'login', component:  AuthComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
