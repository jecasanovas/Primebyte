import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../Shared/Models/course.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent {
  @Input() Course!: Course;
  @Output()
  courseSelected$ = new EventEmitter<number>();

  @Input()
  showBody:boolean = true;

  constructor() {}

  getCourseSelected(e: number) {
    this.courseSelected$.emit(e);
  }
}
