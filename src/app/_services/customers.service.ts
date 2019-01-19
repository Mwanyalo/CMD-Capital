import { Injectable } from '@angular/core';
import { Customer } from '../_models/customer';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private nextId: number;
  public customers: Array<Customer>;

  constructor() {
     const customers = this.getCustomers();

      if (customers.length === 0) {
        this.nextId = 0;
      } else {
        const maxId = customers[customers.length - 1].id;
        this.nextId = maxId + 1;
      }
  }

  public addCustomer(model: Customer) {
    const promise = new Promise((resolve, reject) => {
      model.id = this.nextId;
      const customers = this.getCustomers();
      customers.push(model);
      this.setLocalStorageCustomers(customers);
    });
    return promise;
  }


  public getCustomers() {
    const localStorageItem = JSON.parse(localStorage.getItem('customers'));
    return localStorageItem == null ? [] : localStorageItem.customers;
  }

  private setLocalStorageCustomers(customers: Customer[]) {
    return localStorage.setItem('customers', JSON.stringify({ customers: customers }));
  }


}
