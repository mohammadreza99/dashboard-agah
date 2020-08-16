import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { COMPONENTS, ENTRY_COMPONENTS } from '.';
import { DirectiveModule } from '../directive/directive.module';
import { PrimeModule } from '../@prime/prime.module';
import { PrimeNgModule } from '../@prime/prime-module/prime-ng.module';

@NgModule({
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    DirectiveModule,
    PrimeModule.forRoot(),
    PrimeNgModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ENTRY_COMPONENTS],
})
export class ComponentModule {}
