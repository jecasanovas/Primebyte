import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseService } from '../../../Shared/Services/course.service';
import { CourseIndexComponent } from './course-tab-2/course-index-info/course-index.component';
import { CourseAdditonalInfoComponent } from './course-tab-3/course-additional-info/course-aditional-info.component';


@Component({
  selector: 'app-course-tab',
  templateUrl: './course-tab.component.html',
  styleUrls: ['./course-tab.component.css'],
})
export class CourseTabComponent {
  constructor(public courseService: CourseService) {}
  @ViewChild('tmplVarIndex') tmplVarIndex!:CourseIndexComponent

  @ViewChild('tmplVarAdditionalInfo') tmplVarAdditionalInfo!:CourseAdditonalInfoComponent;

  selectTab(e: number) {
    e === 1 ? this.tmplVarIndex.changePage() : '';
    const test = this.courseService.courseInfo.find(x=>x.id===this.courseService.IdCourse);
    e === 2 ? this.tmplVarAdditionalInfo.description = this.courseService.courseInfo.find(x=>x.id===this.courseService.IdCourse)?.description ?? '' : '';
  }
}

