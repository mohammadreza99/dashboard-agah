import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { COMPONENTS } from '.';
import { CommonModule } from '@angular/common';
import { EducationRoutingModule } from './education-routing.module';
import { CourseContentsPage } from './pages/course-contents/course-contents.page';


@NgModule({
  declarations: [...COMPONENTS, CourseContentsPage],
  exports: [...COMPONENTS],
  imports: [SharedModule, EducationRoutingModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class EducationModule {}
