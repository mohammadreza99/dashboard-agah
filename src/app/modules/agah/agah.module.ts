import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { CommonModule } from '@angular/common';
import { AgahRoutingModule } from './agah-routing.module';
import { PositionsPage } from './pages/positions/positions.page';


@NgModule({
  declarations: [...COMPONENTS, PositionsPage],
  exports: [...COMPONENTS],
  imports: [SharedModule, AgahRoutingModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AgahModule {}
