import {
  Component,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Input,
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

import { debounceTime, fromEvent, Observable, Subject, tap } from 'rxjs';

import { PaginationComponent } from 'ngx-bootstrap/pagination';
import { Subscription } from 'rxjs';
import { CourseDetail } from '../../../../Shared/Models/course-detail.model';
import { CourseService } from '../../../../Shared/Services/course.service';

@Component({
  selector: 'app-course-index-table',
  templateUrl: './course-index-table.component.html',
  styleUrls: ['./course-index-table.component.css'],
})
export class CourseIndexTableComponent implements AfterViewInit, OnDestroy {
  public courseDataIndex$ = this.courseService.obsCourseIndexData$;

  @ViewChild('lesson', { static: false }) lesson!: ElementRef;
  @ViewChild('description', { static: false }) description!: ElementRef;
  @ViewChild('page', { static: false })
  paginator!: PaginationComponent;

  @Output()
  deleteCourseIndex$ = new EventEmitter<number>();
  @Output()
  editCourseIndex$ = new EventEmitter<number>();

  @Input()
  IdCourse = 0;


  totalIdxRows = 0;
  activePage = 1;
  pageSize = 20;
  idteacherfilter = 0;
  courseInfoIndex: CourseDetail[] = [];
  suscription: Subscription[] = [];
  lessonId = 0;
  orderColumns = new Array<string>(2);
  faIconorder0 = faArrowDownAZ as IconProp;
  faIconorder1 = faArrowDownAZ as IconProp;
  faIconTrash = faTrash as IconProp;
  faArrowRight = faArrowRight as IconProp;
  faArrowLeft = faArrowLeft as IconProp;
  obsserverDebounce: Observable<any>[] = [];
  constructor(public courseService: CourseService) {}
  ngOnDestroy(): void {
    this.suscription.forEach((x) => x.unsubscribe);
  }

  ngAfterViewInit(): void {
    const obs1$ = fromEvent(this.lesson.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    const obs2$ = fromEvent(this.description.nativeElement, 'keyup').pipe(
      debounceTime(750)
    );

    this.obsserverDebounce.push(obs1$);
    this.obsserverDebounce.push(obs2$);

    this.obsserverDebounce.forEach((x) =>
      this.suscription.push(
        x.subscribe({
          next: () => {
            this.refreshInfo();
          },
        })
      )
    );
  }

  changePage(e: any) {
    debugger;
    this.activePage = typeof e == 'number' ? e : !e.page ? 1 : e.page;
    this.pageSize = !e.itemsPerPage ? this.pageSize : e.itemsPerPage;

    if (!this.courseService.IdCourse) return;

    this.courseDataIndex$ = this.courseService.getCourseDetail(
      this.courseService.IdCourse,
      this.activePage,
      this.pageSize,
      this.lesson.nativeElement.value,
      this.description.nativeElement.value,
      this.orderColumns
    );
  }

  changeOrder(order: string) {
    const ordernum = parseInt(order);
    if (ordernum === 0) {
      this.faIconorder1 = faArrowDownAZ as IconProp;

      if (this.faIconorder0 === faArrowDownAZ) {
        this.faIconorder0 = faArrowUpAZ as IconProp;
        this.orderColumns[0] = '0D';
      } else {
        this.faIconorder0 = faArrowDownAZ as IconProp;
        this.orderColumns[0] = '0A';
      }
    }
    if (ordernum === 1) {
      this.faIconorder0 = faArrowDownAZ as IconProp;

      if (this.faIconorder1 === faArrowDownAZ) {
        this.faIconorder1 = faArrowUpAZ as IconProp;
        this.orderColumns[1] = '1D';
      } else {
        this.faIconorder1 = faArrowDownAZ as IconProp;
        this.orderColumns[1] = '1A';
      }
    }
    this.refreshInfo();
  }

  changePaginator(page: number) {
    this.paginator.selectPage(page);
  }

  deleteCourse(CouseIndex: number) {
    this.deleteCourseIndex$.emit(CouseIndex);
  }
  editCourseIndex(e: number) {
    this.lessonId = e;
    this.editCourseIndex$.emit(e);
  }
  refreshInfo(): void {
    if (this.activePage !== 1) {
      this.activePage = 1;
      this.paginator.selectPage(this.activePage);
    } else {
      this.changePage(this.activePage);
    }
  }
}
