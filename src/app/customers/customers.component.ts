import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

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
  public submitForm: Boolean;
  public Edit: Boolean;
  public id: number;

  constructor(public formBuilder: FormBuilder, public customersService: CustomersService) {
    this.createForm();
   }

   createForm() {
    this.customerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['',  Validators.compose([
        Validators.required,
        Validators.email
      ])],
      mobileNumber: ['',  Validators.compose([
        Validators.required,
        Validators.minLength(10),
        this.validateMobileNumber
      ])],
      branch: ['', Validators.required],
      loanLimit: ['',  Validators.compose([
        Validators.required,
        Validators.max(50000)
      ])]
    });
   }

   get firstName() { return this.customerForm.get('firstName'); }
   get lastName() { return this.customerForm.get('lastName'); }
   get email() { return this.customerForm.get('email'); }
   get mobileNumber() { return this.customerForm.get('mobileNumber'); }
   get branch() { return this.customerForm.get('branch'); }
   get loanLimit() { return this.customerForm.get('loanLimit'); }

  ngOnInit() {
    this.optionsSelect = [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      ];
      this.viewCustomers();
  }

  // Check if mobile number starts with 07
  validateMobileNumber(control: AbstractControl): { [key: string]: boolean } | null {
    const num = control.value.substring(0, 2);
    if (control.value !== undefined && (isNaN(control.value) || num !== '07')) {
      return { 'invalidNum': true };
    }
    return null;
  }

  branchFilter(event) {
    const branch = event;
    if (branch === 'All Branches') {
      this.viewCustomers();
    } else {
      const filteredCustomers = this.customersService.getCustomers();
      this.customers = [];
      filteredCustomers.filter((customer) => {
        if (customer.branch === branch) {
          this.customers.push(customer);
        }
      });
    }
  }

  viewCustomers() {
    this.customers = this.customersService.getCustomers();
  }

  clearCustomer() {
    this.createForm();
    this.Edit = false;
  }

  editCustomer(customer) {
    this.Edit = true;
    this.id = customer.id;

    this.customerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      mobileNumber: customer.mobileNumber,
      branch: customer.branch,
      loanLimit: customer.loanLimit
    });
  }

  onSubmitCustomer() {
    this.submitForm = true;
    if (this.customerForm.valid) {
      if (this.Edit) {
        let model: Customer;
        model = this.customerForm.value;
        this.editCustomerLoan(model);
      } else {
        let model: Customer;
        model  = this.customerForm.value;
        this.customersService.addCustomer(model);
        alert('Customer Successfully added');
        this.viewCustomers();
        this.createForm();
      }
    }
  }

  editCustomerLoan(model) {
    for (let i = 0; i < this.customers.length; i++) {
      if (this.id === this.customers[i].id) {
        this.customers[i].loanLimit = model.loanLimit;
        this.customersService.setLocalStorageCustomers(this.customers);
        this.viewCustomers();
        this.createForm();
        this.Edit = false;
        this.id = null;
        alert('Customer Loan updated');
        break;
      }
    }
  }

}
