import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Customer } from '../_models/customer';
import { CustomersService } from '../_services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  optionsSelect: Array<any>;
  public customerForm: FormGroup;

  public customers: Array<Customer>;

  constructor(public formBuilder: FormBuilder, public customersService: CustomersService) {

    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      branch: ['', Validators.required],
      loanLimit: ['', Validators.required],
    });

   }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      ];
      this.viewCustomers();
  }

  onSubmitCustomer() {
    let model: Customer;
    model  = this.customerForm.value;
    this.customersService.addCustomer(model).then((result) => {
           console.log(result);
      alert('Customer Successfully added');
      this.viewCustomers();
    }).catch((err) => {
      console.log(err);
    });
  }

  viewCustomers() {
    this.customers = this.customersService.getCustomers();
  }


}
