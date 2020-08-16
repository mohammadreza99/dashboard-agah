import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'product-price-tab',
  templateUrl: './product-price-tab.component.html',
  styleUrls: ['./product-price-tab.component.scss'],
})
export class ProductPriceTabComponent implements OnInit {
  constructor() {}
  @Input() product: Product;
  @Output() onChange = new EventEmitter();
  form = new FormGroup({
    price: new FormControl(null),
    discountType: new FormControl(null),
    discountValue: new FormControl(null),
    discountExpireDate: new FormControl(null),
  });
  discountList = [
    {
      label: 'بدون تخفیف',
      value: 1,
    },
    {
      label: 'ثابت',
      value: 1,
    },
    {
      label: 'درصدی',
      value: 1,
    },
  ];
  discountInputAfterConfig: any;
  
  ngOnInit() {
    this.form.valueChanges.subscribe((controls) => {
      switch (controls['discountType'].value) {
        case 'درصدی':
          this.discountInputAfterConfig = {
            after: { type: 'icon', icon: 'percent' },
          };
          break;
        case 'ثابت':
          this.discountInputAfterConfig = {
            after: { type: 'text', text: 'تومان' },
          };
          break;
        case null:
        case 'بدون تخفیف':
          this.discountInputAfterConfig = {
            after: { type: 'text', text: '--' },
          };
          break;
      }

      this.onChange.emit(this.form.value);
    });
  }
}
