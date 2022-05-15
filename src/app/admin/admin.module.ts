import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseMainInfoComponent } from './course/course-tab/course-tab-1/course-main-info/course-main-info.component';
import { CourseMainInfoFormComponent } from './course/course-tab/course-tab-1/course-main-info/components/course-main-info-form.component';
import { CourseMainInfoTableComponent } from './course/course-tab/course-tab-1/course-main-info/components/course-main-info-table-component';
import { CourseAdditonalInfoComponent } from './course/course-tab/course-tab-3/course-additional-info/course-aditional-info.component';
import { TeacherTabTwoComponent } from './teachers/teacher-tab-two/teacher-tab-two.component';
import { TeacherComponent } from './teachers/teacher/teacher.component';
import { AdminComponent } from './teachers/teachertech-tab/admin.component';
import { TechnologyComponent } from './technology/technology.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { CourseTabComponent } from './course/course-tab/course-tab.component';
import { CourseIndexTableComponent } from './course/course-tab/course-tab-2/course-index-info/components/course-index-table.component';
import { CourseIndexFormComponent } from './course/course-tab/course-tab-2/course-index-info/components/course-index-form.component';
import { CourseIndexComponent } from './course/course-tab/course-tab-2/course-index-info/course-index.component';

@NgModule({
  declarations:[
    TeacherComponent,
    TechnologyComponent,
    AdminComponent,
    TeacherTabTwoComponent,
    CourseMainInfoComponent,
    CourseMainInfoFormComponent,
    CourseMainInfoTableComponent,
    CourseAdditonalInfoComponent,
    CourseTabComponent,
    CourseIndexComponent,
    CourseIndexFormComponent,
    CourseIndexTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule{}

