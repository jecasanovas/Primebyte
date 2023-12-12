import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../../../../Shared/Services/course.service';
import { Course } from '../../../../Shared/Models/course.model';
@Component({
  selector: 'app-course-additional-info',
  templateUrl: './course-additional-info.component.html',
  styleUrls: ['./course-additional-info.component.css'],
})
export class CourseAdditonalInfoComponent {
  constructor(
    private courseService: CourseService,
    private toast: ToastrService
  ) {}

  course!: Course;
  description: string = '';

  changeTextArea(e: any) {
    this.description = e.target.value;
  }

  saveinfo() {
    this.course = this.courseService.courseInfo.find(
      (x) => x.id == this.courseService.IdCourse
    )!;
    this.course.description = this.description ?? '';
    this.courseService.saveInfoCourse(this.course).subscribe({
      complete: () => {
        this.toast.success('Saved!');
      },
    });
  }
}
