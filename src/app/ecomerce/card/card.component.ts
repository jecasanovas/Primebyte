import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/Shared/Models/course.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() Course!: Course;
  @Output()
  courseSelected$ = new EventEmitter<number>();

  constructor() {}

  getCourseSelected(e: number) {
    this.courseSelected$.emit(e);
  }
}
