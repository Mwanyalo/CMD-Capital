import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { LoansComponent } from './loans/loans.component';

const routes: Routes = [
 { path: '', component: CustomersComponent },
 { path: 'loans', component: LoansComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }

