import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { SelectItem } from 'primeng';
import { Customer } from 'src/app/model/customer.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'customer-modify-page',
  templateUrl: './customer-modify-page.html',
  styleUrls: ['./customer-modify-page.scss']
})
export class CustomerModifyPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  states: SelectItem[] = [];
  cities: any[];
  customer = new Customer();
  pageTitle: string = "افزودن مشتری";
  genders = ["male", "female"];
  personalForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    birthDate: new FormControl(),
    nationalCode: new FormControl(),
  });
  addressForm = new FormGroup({
    state: new FormControl(null),
    city: new FormControl(),
    address: new FormControl(),
    postalCode: new FormControl(),
  });
  contactForm = new FormGroup({
    mobile: new FormControl(null, [Validators.minLength(11)]),
    phone: new FormControl(null, [Validators.minLength(11)]),
    email: new FormControl(null, [Validators.email]),
  });
  accountForm = new FormGroup({
    password: new FormControl(),
    subscription: new FormControl(),
  });

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params["id"])
        this.dataService.getCustomerById(params["id"]).then((customer) => {
          this.customer = customer;
          this.personalForm.setValue({
            firstName: this.customer.firstName,
            lastName: this.customer.lastName,
            gender: this.customer.gender,
            birthDate: this.customer.birthDate,
            nationalCode: this.customer.nationalCode,
          });
          this.addressForm.setValue({
            state: this.customer.address.state,
            city: this.customer.address.city,
            address: this.customer.address.postalAddress,
            postalCode: this.customer.address.postalCode,
          });
          this.contactForm.setValue({
            mobile: this.customer.mobile,
            phone: this.customer.phone,
            email: this.customer.email,
          });
          this.accountForm.setValue({
            subscription: this.customer.subscription,
            password: this.customer.password,
          });
          this.pageTitle = `ویرایش مشتری - ${this.customer.firstName}  ${this.customer.lastName}`;
        });
    });
    for (const state of this.dataService.states)
      this.states.push({ label: state.label, value: state.label });
  }

  onSaveClick() {}

  onCancelClick() {}
}
