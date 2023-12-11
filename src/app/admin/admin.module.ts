import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherTabTwoComponent } from './teachers/teacher-tab-2/components/teacher-tab-two.component';
import { TeacherComponent } from './teachers/teacher-tab-1/Components/teacher.component';
import { TechnologyComponent } from './technology/technology.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../Shared/shared.module';
import { TeacherTabComponent } from './teachers/teacher-tab.component';
import { UserTabComponent } from './User/user-tab.component';
import { UserTableOneComponent } from './User/user-tab-1/components/user-table-one.component';
import { UserTabOneComponent } from './User/user-tab-1/components/user-tab-one.component';
import { UserTabTwoComponent } from './User/user-tab-2/components/user-tab-two.component';
import { UserTableTwoComponent } from './User/user-tab-2/components/user-table-two.component';
import { UserTabThreeComponent } from './User/user-tab-3/components/user-tab-three.component';
import { UserTableThreeComponent } from './User/user-tab-3/components/user-table-three.component';
import { CourseMainInfoFormComponent } from './course/course-tab-1/components/course-main-info-form.component';
import { CourseMainInfoTableComponent } from './course/course-tab-1/components/course-main-info-table-component';
import { CourseAdditonalInfoComponent } from './course/course-tab-3/components/course-aditional-info.component';
import { CourseTabComponent } from './course/course-tab.component';
import { CourseIndexFormComponent } from './course/Course-tab-2/components/course-index-form.component';
import { CourseIndexTableComponent } from './course/Course-tab-2/components/course-index-table.component';

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
    TeacherTabComponent,
    UserTabComponent,
    UserTableOneComponent,
    UserTabOneComponent,
    UserTabTwoComponent,
    UserTableTwoComponent,
    UserTabThreeComponent,
    UserTableThreeComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule

  ]
})
export class AdminModule{}

