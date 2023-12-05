import {
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnInit,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  faArrowUpAZ,
  faArrowDownAZ,
  faTrash,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';

import { IconProp } from '@fortawesome/fontawesome-svg-core';


import { debounceTime, fromEvent, Subscription } from 'rxjs';

import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Teacher } from '../../../../../../../app/Shared/Models/teacher.interface';
import { Course } from '../../../../../../../app/Shared/Models/course.interface';
import { CourseService } from '../../../../../../../app/Shared/Services/course.service';


@Component({
  selector: 'app-course-main-info-table',
  templateUrl: './course-main-info-table.component.html',
  styleUrls: ['./course-main-info-table.component.css'],
})
export class CourseMainInfoTableComponent implements AfterViewInit, OnDestroy, OnInit {
  public CourseData$ = this.courseService.obstCourse$;

  @ViewChild('title', { static: false }) title!: ElementRef;
  @ViewChild('page', { static: false })
  paginator!: PaginationComponent;

  @Output()
  deleteCourse$ = new EventEmitter<number>();
  @Output()
  editCourse$ = new EventEmitter<number>();

  @Input()
  Teachers: Teacher[] = [];

  subsFromEvt!: Subscription;

  activePage = 1;
  pageSize = 10;
  totalCourses = 0;
  idteacherfilter = 0;
  courseInfo: Course[] = [];
  idSelected = 0;
  orderColumns = ['', ''];
  faIconorder0 = faArrowDownAZ as IconProp;
  faIconorder1 = faArrowDownAZ as IconProp;
  faIconTrash = faTrash as IconProp;
  totalPages = 0;
  faArrowRight = faArrowRight as IconProp;
  faArrowLeft = faArrowLeft as IconProp;
  constructor(public courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getTeachersData().subscribe({
      next: (result) => this.Teachers = result.data
      }
    )

    this.changePage(this.activePage);
  }

  ngAfterViewInit(): void {
    this.subsFromEvt = fromEvent(this.title.nativeElement, 'keyup')
      .pipe(debounceTime(750))
      .subscribe({
        next: () => {
          if (this.activePage !== 1) {
            this.paginator.selectPage(1);
          } else {
            this.activePage = 1;
            this.changePage(this.activePage);
          }
          this.activePage = 1;
          this.title.nativeElement.focus();
        },
      });
  }

  changePage(e: any) {
    this.activePage = typeof e == 'number' ? e : !e.page ? 1 : e.page;

    this.pageSize = !e.itemsPerPage ? this.pageSize : e.itemsPerPage;
    const title = this.title?.nativeElement?.value;

    this.CourseData$ = this.courseService.getCourses(
      this.activePage,
      this.pageSize,
      title,
      this.orderColumns,
      [this.idteacherfilter]
    );
  }

  changeOrder(order: string) {
    this.orderColumns = ['', ''];
    const ordernum = parseInt(order);
    if (ordernum === 0) {
      this.faIconorder1 = faArrowDownAZ as IconProp;

      if (this.faIconorder0 === faArrowDownAZ) {
        this.faIconorder0 = faArrowUpAZ as IconProp;
        this.orderColumns[ordernum] = '0D';
      } else {
        this.faIconorder0 = faArrowDownAZ as IconProp;
        this.orderColumns[ordernum] = '0A';
      }
    }
    if (ordernum === 1) {
      this.faIconorder0 = faArrowDownAZ as IconProp;

      if (this.faIconorder1 === faArrowDownAZ) {
        this.faIconorder1 = faArrowUpAZ as IconProp;
        this.orderColumns[ordernum] = '1D';
      } else {
        this.faIconorder1 = faArrowDownAZ as IconProp;
        this.orderColumns[ordernum] = '1A';
      }
    }

    if (this.activePage !== 1) {
      this.activePage = 1;
      this.changePaginator(this.activePage);
    } else {
      this.changePage(this.activePage);
    }
  }

  changePaginator(page: number) {
    this.paginator.selectPage(page);
  }

  filterTeacher(e: any) {
    const teacherfilter = e?.target?.value;
    if (teacherfilter && teacherfilter > 0) {
      this.idteacherfilter = teacherfilter;

      if (this.activePage !== 1) {
        this.activePage = 1;
        this.paginator.selectPage(this.activePage);
      } else {
        this.changePage(this.activePage);
      }
      this.activePage = 1;
    }
  }

  deleteCourse(course: number) {
    this.deleteCourse$.emit(course);
  }
  editCourse(e: number) {
    this.idSelected = e;
    this.courseService.IdCourse = this.idSelected;
    this.editCourse$.emit(e);
  }
  ngOnDestroy(): void {
    this.subsFromEvt.unsubscribe();
  }
}
