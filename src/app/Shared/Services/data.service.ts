import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { exhaustMap, map, pluck, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'
import { HttpParams } from '@angular/common/http';
import { Paginaton } from '../Models/paginaton.model';
import { Teacher } from '../Models/teacher.model';
import { Technology } from '../Models/tecnology.model';
import { Countries } from '../Models/countries.model';
import { TechnologyDetails } from '../Models/technology-details.model';
import { UserInfo } from '../Models/user-info.model';
import { CourseDetail } from '../Models/course-detail.model';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  endPoint = environment.endPoint

  constructor(private http: HttpClient) {

  }


  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  Teacher!: Teacher;
  Techology!:Technology[];
   getTeachers(): Observable<Paginaton<Teacher>> {
    return this.http.get<Paginaton<Teacher>>(this.endPoint + '/Teacher').pipe(
      map((result: Paginaton<Teacher>) => {
        const data = result.data.forEach(
          (x) => (x.name = x.name + ' ' + x.surname)
        );
        return result;
      })
    );
  }

  downloadFile(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.get(`${this.endPoint}/Course/Download`, {
      responseType: 'blob',
      params: requestparms,
    });
  }

  saveInfoCourseDetail(courseDetail: CourseDetail) {
    if ((courseDetail.id ?? 0) === 0)
      return this.http.post<CourseDetail>(
        `${this.endPoint}/Course/Detail`,
        courseDetail
      );
    else
      return this.http.put<CourseDetail>(
        `${this.endPoint}/Course/Detail`,
        courseDetail
      );
  }

  getTeachersData(
    page: number,
    pagesize: number
  ): Observable<Paginaton<Teacher>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pagesize);
    return this.http.get<Paginaton<Teacher>>(this.endPoint + '/Teacher', {
      params: requestparms,
    });
  }

  getTechnology(): Observable<Technology[]> {
    return this.http.get<Technology[]>(this.endPoint + '/Technology')
    .pipe(
      tap((data) => {

        this.Techology = [...data];
      }));
  }

  getCountries(): Observable<Countries[]> {
    return this.http.get<Countries[]>(this.endPoint + '/Country/Country');
  }

  saveInfoCourseDetailMassive(id: number, formdata: FormData) {
    let params = new HttpParams();
    params = params.append('id', id);
    return this.http.post(`${this.endPoint}/Course/Upload`, formdata, {
      params: params,
    });
  }

  getTechnologyDetail(): Observable<TechnologyDetails[]> {
    return this.http.get<TechnologyDetails[]>(
      this.endPoint + '/Technology/Details'
    );
  }

  deleteTeacher(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(this.endPoint + '/Teacher', {
      params: requestparms,
    });
  }

  deleteCourse(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(`${this.endPoint}/Course`, {
      params: requestparms,
    });
  }

  saveInfoTeacher(teacher: Teacher): Observable<Teacher> {
    if ((teacher.id ?? 0) === 0)
      return this.http.post<number>(this.endPoint + '/Teacher', teacher).pipe(
        tap((res: number) => (teacher.id = res)),
        exhaustMap(() => this.uploadPhotoTeacher(teacher.id, teacher.formData))
      );
    else
      return this.http
        .put<number>(this.endPoint + '/Teacher', teacher)
        .pipe(
          exhaustMap(() => this.uploadPhotoTeacher(teacher.id, teacher.formData)
          )
        );
  }

  uploadPhotoTeacher(id: number, formData: FormData): Observable<Teacher> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    if (formData) {
      return this.http.post<any>(this.endPoint + '/Teacher/File', formData, {
        params: requestparms,
      });
    } else {
      return of();
    }
  }

  uploadPhoto(
    id: number,
    formData: FormData | undefined,
    endpoint: string
  ): Observable<any> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    if (formData != undefined)
      return this.http.post<any>(this.endPoint + endpoint, formData, {
        params: requestparms,
      });
    else return of(-1);
  }


  uploadFileTeacher(formData: FormData): Observable<any> {
    return this.http.post<any>(this.endPoint + '/Teacher/File', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  saveTechnology(technology: Technology) {
    if ((technology.id ?? 0) === 0)
      return this.http.post<Technology>(
        this.endPoint + '/technology',
        technology
      );
    else
      return this.http.put<Technology>(
        this.endPoint + '/technology',
        technology
      );
  }

  deleteTechnology(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(this.endPoint + '/Technology', {
      params: requestparms,
    });
  }

  deleteTechnologyDetails(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(this.endPoint + '/Technology/Details', {
      params: requestparms,
    });
  }

  saveTechnologyDetail(
    technology: Technology,
    technologyDetails: TechnologyDetails
  ) {
    return this.saveTechnology(technology).pipe(
      map<any, number>((result: any) => {
        return +result;
      }),
      tap((id: number) => {
        technologyDetails.technologyId = id;
      }),
      exhaustMap(() =>
        this.http.post<TechnologyDetails>(
          this.endPoint + '/technology/Details',
          technologyDetails
        )
      )
    );
  }
  saveInfoUser(user: UserInfo): Observable<UserInfo> {
    if ((user.id ?? 0) === 0) {
      return this.http.post<UserInfo>(this.endPoint + '/UserInfo', user);
    } else {
      return this.http.put<UserInfo>(this.endPoint + '/Course', user);
    }
  }
}
