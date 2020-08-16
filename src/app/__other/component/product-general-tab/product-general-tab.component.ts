import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'product-general-tab',
  templateUrl: './product-general-tab.component.html',
  styleUrls: ['./product-general-tab.component.scss']
})
export class ProductGeneralTabComponent implements OnInit {

  constructor() {}
  @Input() product: Product;
  @Output() onChange = new EventEmitter();

  stockList = [
    {
      label: "بزودی",
      value: 1
    },
    {
      label: "ناموجود",
      value: 2
    },
    {
      label: "موجود - نامحدود",
      value: 3
    },
    {
      label: "موجود - محدود",
      value: 4
    }
  ];
  form = new FormGroup({
    nationalCode: new FormControl(null),
    name: new FormControl(null),
    stock: new FormControl(null),
    count: new FormControl(null),
    description: new FormControl(null),
    isActive: new FormControl(false),
    releaseDate: new FormControl(null)
  });

  ngOnInit() {
    this.form.valueChanges.subscribe(event => {
      this.onChange.emit(this.form.value);
    });
  }

}
