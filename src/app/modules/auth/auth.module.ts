import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { AuthRoutingModule } from '@modules/auth/auth-routing.module';
import { COMPONENTS } from '.';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [...COMPONENTS, LoginPage],
  exports: [...COMPONENTS],
  imports: [AuthRoutingModule, SharedModule],
})
export class AuthModule {}
