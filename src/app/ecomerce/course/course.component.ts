import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/Shared/Models/course.interface';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @Input() Course!: Course;
  @Output()
  courseSelected$ = new EventEmitter<number>();

  constructor() {}

  getCourseSelected(e: number) {
    this.courseSelected$.emit(e);
  }
}
