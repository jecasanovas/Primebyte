import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, exhaustMap, map, Observable, tap } from 'rxjs';
import { DataService } from './data.service';
import * as saveAs from 'file-saver';
import { Paginaton } from '../Models/paginaton.model';
import { Course } from '../Models/course.model';
import { CourseDetail } from '../Models/course-detail.model';
import { Technology } from '../Models/tecnology.model';
import { TechnologyDetails } from '../Models/technology-details.model';
import { Teacher } from '../Models/teacher.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  paginator!: Paginaton<Course>;
  endPoint = environment.endPoint;

  constructor(
    private http: HttpClient,
    private dataservice: DataService
  ) {

  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public IdCourse: number = 0;
  private page!: Paginaton<Course>;
  private pageIndex!: Paginaton<CourseDetail>;
  public courseIndexInfo: CourseDetail[] = [];
  public courseInfo: Course[] = [];
  public totalCourses = 0;
  public totalIdxRows = 0;
  public idAddressSelected = 0;

  private CourseData = new BehaviorSubject<Paginaton<Course>>(this.page);
  private CourseIndexData = new BehaviorSubject<Paginaton<CourseDetail>>(
    this.pageIndex
  );
  public obstCourse$ = this.CourseData.asObservable();
  public obsCourseIndexData$ = this.CourseIndexData.asObservable();

  /*************************************** Data **************************************** */

  /*************************************** Functions **************************************** */

  public getTechnology(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${this.endPoint}/Technology`);
  }
  public getTechnologyDetail(): Observable<TechnologyDetails[]> {
    return this.http.get<TechnologyDetails[]>(
      `${this.endPoint}/Technology/Details`
    );
  }

  public getCourses(
    page: number,
    pageSize: number,
    title: string,
    order: string[],
    idteach: number[],
    idtec?:number[],
    idtechdet?:number[]
  ): Observable<Paginaton<Course>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pageSize);
    if (title) requestparms = requestparms.append('name', title);
    if (order) requestparms = requestparms.append('order', order.toString());
    if (idteach) requestparms = requestparms.append('idteacher', idteach.toString());
    if (idtec) requestparms = requestparms.append('idtec', idtec.toString());
    if (idtechdet) requestparms = requestparms.append('idtechdet', idtechdet.toString());
    return this.http
      .get<Paginaton<Course>>(`${this.endPoint}/Course`, {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.totalCourses = next.count;
          this.courseInfo = [...next.data];
        })
      );
  }

  public getCoursebyId(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('page', 1);
    requestparms = requestparms.append('pagesize', 1);
    requestparms = requestparms.append('id', id);
    return this.http
      .get<Paginaton<Course>>(`${this.endPoint}/Course`, {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.totalCourses = next.count;
          this.courseInfo = [...next.data];
        })
      );
  }

  public getTeachersData(
    page?: number,
    pagesize?: number
  ): Observable<Paginaton<Teacher>> {
    let requestparms = new HttpParams();
    if (page) requestparms = requestparms.append('page', page);
    if (pagesize) requestparms = requestparms.append('pagesize', pagesize);

    return this.http
      .get<Paginaton<Teacher>>(`${this.endPoint}/Teacher`, {
        params: requestparms,
      })
      .pipe(
        map((result: Paginaton<Teacher>) => {
          const data = result.data.forEach(
            (x) => (x.name = x.name + ' ' + x.surname)
          );
          return result;
        })
      );
  }

  getCourseDetail(
    CourseId: number,
    page: number,
    pagesize: number,
    lessonId: number,
    description: string,
    order: string[]
  ): Observable<Paginaton<CourseDetail>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('courseId', CourseId);
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pagesize);

    if (lessonId >= 0) requestparms = requestparms.append('lessonID', lessonId);
    if (description)
      requestparms = requestparms.append('description', description);
    if (order) requestparms = requestparms.append('order', order.toString());
    return this.http
      .get<Paginaton<CourseDetail>>(this.endPoint + '/Course/Detail', {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.courseIndexInfo = [...next.data];
          this.totalIdxRows = next.count;
        })
      );
  }


  saveInfoCourse(course: Course): Observable<Course> {
    if ((course.id ?? 0) === 0)
      return this.http.post<Course>(this.endPoint + '/Course', course).pipe(
        tap((res: Course) => (course.id = res.id)),
        exhaustMap(() =>
          this.dataservice.uploadPhoto(
            course.id,
            course.formData,
            '/Course/File'
          )
        )
      );
    else
      return this.http
        .put<Course>(this.endPoint + '/Course', course)
        .pipe(
          exhaustMap(() =>
            this.dataservice.uploadPhoto(
              course.id,
              course.formData,
              '/Course/File'
            )
          )
        );
  }
}
