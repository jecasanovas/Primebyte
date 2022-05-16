/* eslint-disable @angular-eslint/component-selector */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  PatternValidator,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Toast, ToastrService } from 'ngx-toastr';
import { Login } from '../Shared/Models/login.interface';
import { LoginResult } from '../Shared/Models/login-result.interface';
import { emailValidator } from '../Shared/validators/customemailvalidator';
import { AutorizationService } from '../autorization.service';
import { NavBarComponent } from '../Shared/nav-bar/nav-bar.component';
import { ShopService } from '../Shared/Services/shop.service';


@Component({
  selector: 'login.component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent  {

  public constructor(
    private router: Router,
    private access: AutorizationService,
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    ) {
    localStorage.removeItem('token');
   }

  public Form = this.formBuilder.group({
    email: ['', emailValidator()],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  public navigate(): void {
    if (!this.Form.valid) {
      this.Form.markAllAsTouched();
      return;
    }

    const login: Login = {
      email: this.Form.get('email')?.value,
      password: this.Form.get('password')?.value,
    };

    this.access.loginUser(login).subscribe(
      (result: LoginResult) => {
        localStorage.removeItem('token');
        if (result.token && result.token.length > 0) {
          localStorage.setItem('token', result.token);
          this.router.navigate(['/ecommerce/home']);
        }
      },
      (error) => {
        this.toast.show('Incorrect Email or Password');
      }
    );
  }
}
