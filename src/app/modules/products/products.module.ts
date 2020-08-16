import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { ProductsRoutingModule } from '@modules/products/products-routing.module';
import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [...COMPONENTS, ],
  exports: [...COMPONENTS],
  imports: [SharedModule, ProductsRoutingModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ProductsModule {}
