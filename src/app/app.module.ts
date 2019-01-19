import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { LoansComponent } from './loans/loans.component';

import { AppRoutingModule } from './app-routing.module';
import { CustomersService } from './_services/customers.service';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    LoansComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [ CustomersService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
