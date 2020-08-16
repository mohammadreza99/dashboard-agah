import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PrimeTree } from 'src/app/@prime/prime-model/prime-tree.model';

@Component({
  selector: 'product-extra-field-tab',
  templateUrl: './product-extra-field-tab.component.html',
  styleUrls: ['./product-extra-field-tab.component.scss'],
})
export class ProductExtraFieldTabComponent implements OnInit {
  constructor() {}
  allExtraFields: PrimeTree[] = [];
  selectedExtraFields: PrimeTree;
  form = new FormGroup({});
  ngOnInit() {}
}
