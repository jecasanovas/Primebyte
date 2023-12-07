import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseMainInfoFormComponent } from './course/course-tab/course-tab-1/components/course-main-info-form.component';
import { CourseMainInfoTableComponent } from './course/course-tab/course-tab-1/components/course-main-info-table-component';
import { CourseAdditonalInfoComponent } from './course/course-tab/course-tab-3/Components/course-aditional-info.component';
import { TeacherTabTwoComponent } from './teachers/teacher-tab-2/components/teacher-tab-two.component';
import { TeacherComponent } from './teachers/teacher-tab-1/Components/teacher.component';
import { TechnologyComponent } from './technology/technology.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { CourseTabComponent } from './course/course-tab/course-tab.component';
import { CourseIndexTableComponent } from './course/course-tab/Course-tab-2/components/course-index-table.component';
import { CourseIndexFormComponent } from './course/course-tab/Course-tab-2/components/course-index-form.component';
import { TeacherTabComponent } from './teachers/teacher-tab.component';

@NgModule({
  declarations:[
    TeacherComponent,
    TechnologyComponent,
    CourseMainInfoFormComponent,
    CourseMainInfoTableComponent,
    CourseAdditonalInfoComponent,
    CourseTabComponent,
    CourseIndexFormComponent,
    CourseIndexTableComponent,
    TeacherComponent,
    TeacherTabTwoComponent,
    TeacherTabComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class AdminModule{}

