import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResult } from './Shared/Models/login-result.interface';
import { Login } from './Shared/Models/login.interface';





@Injectable({
  providedIn: 'root',
})
export class AutorizationService {
  endPoint = 'https://localhost:5001/api';
  logged: Boolean = false;

  constructor(private http: HttpClient) {
    if (environment.production) {
      this.endPoint = 'https://primeapi.net/api';
    }
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loginUser(login: Login): Observable<LoginResult> {
    return this.http.post<LoginResult>(
      this.endPoint + '/Account/login',
      login
    );
  }

  CheckAccess(): Observable<boolean> {
    return this.http.get<boolean>(this.endPoint + '/Account/status');
  }
}
