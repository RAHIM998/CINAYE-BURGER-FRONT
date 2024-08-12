import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';  
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BurgerComponent } from './Burger/burger/burger.component';
import { OrdersComponent } from './Orders/orders/orders.component';
import { PaymentsComponent } from './Payments/payments/payments.component';
import { UsersComponent } from './Users/users/users.component';
import { AccueilComponent } from './Accueil/accueil/accueil.component';
import { HttpClientModule } from '@angular/common/http';
import { FormUsersComponent } from './Users/form-users/form-users.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommonModule } from '@angular/material/core';
import { DetailsUsersComponent } from './Users/details-users/details-users.component';
import { FormBurgerComponent } from './Burger/form-burger/form-burger.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DetailsBurgerComponent } from './Burger/details-burger/details-burger.component';
import { ArchivedBurgerComponent } from './Burger/archived-burger/archived-burger.component';
import { DetailsPaymentsComponent } from './Payments/details-payments/details-payments.component';


@NgModule({
  declarations: [
    AppComponent,
    BurgerComponent,
    OrdersComponent,
    PaymentsComponent,
    UsersComponent,
    AccueilComponent,
    FormUsersComponent,
    DetailsUsersComponent,
    FormBurgerComponent,
    DetailsBurgerComponent,
    ArchivedBurgerComponent,
    DetailsPaymentsComponent,
    
  ],
  imports: [
    HttpClientModule, 
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatCardModule,
    MatPaginatorModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
