import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { ContactModule } from './modules/contact/contact.module';
import { AgahModule } from './modules/agah/agah.module';
import { EducationModule } from './modules/education/education.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { JobsModule } from './modules/jobs/jobs.module';
import { MultimediaModule } from './modules/multimedia/multimedia.module';
import { UsersModule } from './modules/users/users.module';
import { AuthGuard } from './core/guards/auth.guard';

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AgahModule,
    AuthModule,
    ContactModule,
    EducationModule,
    GalleryModule,
    HomeModule,
    JobsModule,
    MultimediaModule,
    ProductsModule,
    UsersModule,
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
