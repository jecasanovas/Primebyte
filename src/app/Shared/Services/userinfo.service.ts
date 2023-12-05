import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, exhaustMap, Observable, of, tap } from 'rxjs';
import { DataService } from './data.service';
import { Paginaton } from '../Models/paginaton.interface';
import { UserInfo } from '../Models/user-info.interface';
import { Addresses } from '../Models/addresses.interface';
import { PaymentInfo } from '../Models/payment-info.interface';

@Injectable({
  providedIn: 'root',
})
export class UserinfoService {
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

  public idUser: number = 0;
  public idAddress: number = 0;
  public idpayment: number = 0;
  private page!: Paginaton<UserInfo>;
  private page2!: Paginaton<Addresses>;
  private page3!: Paginaton<PaymentInfo>;


  public totalUsers = 0;
  public totalAddress = 0;
  public totalPayment = 0;

  private userData = new BehaviorSubject<Paginaton<UserInfo>>(this.page);
  private addressData = new BehaviorSubject<Paginaton<Addresses>>(this.page2);
  private paymentInfoData = new BehaviorSubject<Paginaton<PaymentInfo>>(
    this.page3
  );
  public obstUsers$ = this.userData.asObservable();
  public obstAddresses$ = this.addressData.asObservable();
  public obsPaymentInfo$ = this.paymentInfoData.asObservable();

  getUsers(
    page: number,
    pagesize: number,
    email?: string,
    name?: string,
    order?: string[],
    id?: number
  ): Observable<Paginaton<UserInfo>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pagesize);
    if (email) requestparms = requestparms.append('email', email);
    if (name) requestparms = requestparms.append('name', name);
    if (order) requestparms = requestparms.append('order', order.toString());
    if (id) {
      requestparms = requestparms.append('id', id);
      this.idUser = id;
    }

    return this.http
      .get<Paginaton<UserInfo>>(this.endPoint + '/UserInfo', {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.userData.next(next);
          this.totalUsers = next.count;
        })
      );
  }

  getAddress(
    id: number,
    page: number,
    pagesize: number,
    cp: string,
    street: string,
    order: string[]
  ): Observable<Paginaton<Addresses>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('UserInfoId', id);
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pagesize);
    if (cp) requestparms = requestparms.append('cp', cp);
    if (street) requestparms = requestparms.append('street', street);
    if (order) requestparms = requestparms.append('order', order.toString());

    return this.http
      .get<Paginaton<Addresses>>(this.endPoint + '/Addresses', {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.addressData.next(next);
          this.totalAddress = next.count;
        })
      );
  }

  getPaymentInfo(
    id: number,
    page: number,
    pagesize: number,
    name: string,
    cardHolderName: string,
    order: string[]
  ): Observable<Paginaton<PaymentInfo>> {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('UserInfoId', id);
    requestparms = requestparms.append('page', page);
    requestparms = requestparms.append('pagesize', pagesize);
    if (name) requestparms = requestparms.append('name', name);
    if (cardHolderName)
      requestparms = requestparms.append('cardHolderName', cardHolderName);
    if (order) requestparms = requestparms.append('order', order.toString());

    return this.http
      .get<Paginaton<PaymentInfo>>(this.endPoint + '/PaymentInfo', {
        params: requestparms,
      })
      .pipe(
        tap((next) => {
          this.paymentInfoData.next(next);
          this.totalPayment = next.count;
        })
      );
  }

  saveInfoUser(user: UserInfo): Observable<UserInfo> {
    if ((user.id ?? 0) === 0) {
      return this.http.post<UserInfo>(this.endPoint + '/UserInfo', user).pipe(
        tap((res: UserInfo) => (user.id = res.id)),
        exhaustMap(() =>
          this.dataservice.uploadPhoto(
            user.id,
            user.userPhoto,
            '/UserInfo/File'
          )
        )
      );
    } else {
      return this.http.put<UserInfo>(this.endPoint + '/UserInfo', user).pipe(
        tap((res: UserInfo) => (user.id = res.id)),
        exhaustMap(() =>
          this.dataservice.uploadPhoto(
            user.id,
            user.userPhoto,
            '/UserInfo/File'
          )
        )
      );
    }
  }

  saveInfoAddresses(address: Addresses): Observable<Addresses> {
    if ((address.id ?? 0) === 0) {
      return this.http.post<Addresses>(this.endPoint + '/Addresses', address);
    } else {
      return this.http.put<Addresses>(this.endPoint + '/Addresses', address);
    }
  }

  saveInfoPayments(payment: PaymentInfo): Observable<Addresses> {
    if ((payment.id ?? 0) === 0) {
      return this.http.post<Addresses>(this.endPoint + '/PaymentInfo', payment);
    } else {
      return this.http.put<Addresses>(this.endPoint + '/PaymentInfo', payment);
    }
  }

  deleteUser(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(`${this.endPoint}/UserInfo`, {
      params: requestparms,
    });
  }

  deleteAddress(id: number) {
    let requestparms = new HttpParams();
    requestparms = requestparms.append('id', id);
    return this.http.delete(`${this.endPoint}/Addresses`, {
      params: requestparms,
    });
  }
}
