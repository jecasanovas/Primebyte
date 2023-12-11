import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../Shared/Services/course.service';
import { CourseAdditonalInfoComponent } from './course-tab-3/components/course-aditional-info.component';
import { CourseIndexFormComponent } from './Course-tab-2/components/course-index-form.component';


@Component({
  selector: 'app-course-tab',
  templateUrl: './course-tab.component.html',
  styleUrls: ['./course-tab.component.css'],
})
export class CourseTabComponent {
  constructor(public courseService: CourseService) {}
  @ViewChild('tmplVarIndex') tmplVarIndex!:CourseIndexFormComponent

  @ViewChild('tmplVarAdditionalInfo') tmplVarAdditionalInfo!:CourseAdditonalInfoComponent;

  selectTab(e: number) {
   e === 1 ? this.tmplVarIndex.tmplVarCourseIndex.changePage(e) : '';
   const test = this.courseService.courseInfo.find(x=>x.id===this.courseService.IdCourse);
   e === 2 ? this.tmplVarAdditionalInfo.description = this.courseService.courseInfo.find(x=>x.id===this.courseService.IdCourse)?.description ?? '' : '';
  }
}

