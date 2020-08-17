import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { ContentRoutingModule } from '@modules/content/content-routing.module';
import { COMPONENTS } from '.';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  imports: [ContentRoutingModule, SharedModule, CoreModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ContentModule {}
