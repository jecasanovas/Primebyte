import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateGuard } from '../canactivate.guard';
import { CourseTabComponent } from './course/course-tab/course-tab.component';

import { TechnologyComponent } from './technology/technology.component';
import { TeacherComponent } from './teachers/teacher-tab-1/Components/teacher.component';
import { TeacherTabComponent } from './teachers/teacher-tab.component';


const routes: Routes = [
  {
    path: 'courses',
    component:CourseTabComponent ,
    canActivate: [CanactivateGuard],
  },
  {
    path: 'technology',
    component: TechnologyComponent,
    canActivate: [CanactivateGuard],
  },
  {
    path: 'teachers',
    component: TeacherTabComponent,
    canActivate: [CanactivateGuard],
  },

];

@NgModule({

  imports: [

    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
