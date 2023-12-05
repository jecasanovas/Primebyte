import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../../Shared/Models/course.interface';
import { Paginaton } from '../../Shared/Models/paginaton.interface';
import { CourseService } from '../../Shared/Services/course.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  public Courses:Course[] = [];
  public obsCoursesTrending$!:Observable<Paginaton<Course>>;
  public obsCoursesViewed$!:Observable<Paginaton<Course>>;


  constructor(private courseService:CourseService) {

  }

  ngOnInit(): void {
    this.obsCoursesTrending$ =this.courseService.getCourses(1,4,'',[],[]);
    this.obsCoursesViewed$ = this.courseService.getCourses(2,4,'',[],[])
  }
}
