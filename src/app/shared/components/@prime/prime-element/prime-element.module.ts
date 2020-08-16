import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DpDatePickerModule } from 'ng2-jalali-date-picker';

import { ENTRY_COMPONENTS, ELEMENTS } from '.';
import { PrimeNgModule } from '../prime-module/prime-ng.module';
import { PrimeDirectiveModule } from '../prime-directive/prime-directive.module';

@NgModule({
  declarations: [ELEMENTS],
  exports: [...ELEMENTS, PrimeNgModule],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    DpDatePickerModule,
    PrimeNgModule,
    PrimeDirectiveModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ENTRY_COMPONENTS],
})
export class PrimeElementModule {}
