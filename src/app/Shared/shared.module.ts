import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from '../login/login.component';
import { FrameworkModule } from '../Framework/framework.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    LoginComponent,
    NavBarComponent
  ],
  imports: [
    SharedRoutingModule,
    ReactiveFormsModule,
    FrameworkModule,
    CommonModule
  ],
  exports:[
    NavBarComponent,
    LoginComponent,
    FrameworkModule,
    TabsetComponent
  ]
})
export class SharedModule { }
