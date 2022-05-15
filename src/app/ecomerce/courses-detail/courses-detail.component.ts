import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  Data,
  ParamMap,
  Params,
  Router,
} from '@angular/router';
import {
  combineLatest,
  exhaustMap,
  forkJoin,
  from,
  Observable,
  observable,
  tap,
} from 'rxjs';
import { Course } from 'src/app/Shared/Models/course.interface';
import { CourseService } from 'src/app/Shared/Services/course.service';
import { CourseDetail } from 'src/app/Shared/Models/course-detail.interface';
import { Basket } from 'src/app/Shared/Models/basket.interface';
import { ShopService } from 'src/app/Shared/Services/shop.service';


@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.css'],
})
export class CoursesDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private shopService: ShopService
  ) {}
  courseId = 0;
  imgShow = '';
  courseInfo!: Course;
  courseInfoDetail!: CourseDetail[];

  ngOnInit(): void {
    const obs$ = this.route.paramMap.pipe(
      tap((x) => (this.courseId = parseInt(x.get('id')!))),

      exhaustMap(() =>
        forkJoin([
          this.courseService.getCoursebyId(this.courseId),
          this.courseService.getCourseDetail(this.courseId, 1, 500, -1, '', []),
        ])
      )
    );

    const obsdetail$ = obs$.subscribe({
      next: ([course, detail]) => {
        this.courseInfo = course.data[0];
        this.imgShow = this.courseInfo!.photo;
        this.courseInfoDetail = detail.data;
      },
    });
  }

  addtoCart(e: any) {
    const basket: Basket = {
      idCourse: this.courseId,
      courseDesc: this.courseInfo?.name,
      price: 10,
      unit: +e.value,
      total: 10 * +e.value,
      id: 0,
      photo: this.courseInfo?.photo,
    };

    this.shopService.addItem(basket);
  }
}
