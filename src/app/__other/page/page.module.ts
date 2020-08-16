import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PAGES } from '.';
import { ComponentModule } from '../component/component.module';
import { DirectiveModule } from '../directive/directive.module';
import { ROUTES } from './page.route';
import { PrimeModule } from '../@prime/prime.module';
import { PrimeNgModule } from '../@prime/prime-module/prime-ng.module';

@NgModule({
  declarations: [PAGES],
  exports: [PAGES, RouterModule],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    ComponentModule,
    DirectiveModule,
    PrimeModule.forRoot(),
    PrimeNgModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class PageModule {}
