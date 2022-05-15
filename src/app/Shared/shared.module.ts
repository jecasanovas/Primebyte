import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { UserTabComponent } from './User/user-tab/user-tab.component';
import { UserTableOneComponent } from './User/user-table-one/user-table-one.component';
import { UserTabOneComponent } from './User/user-tab-one/user-tab-one.component';
import { UserTabTwoComponent } from './User/user-tab-two/user-tab-two.component';
import { UserTableTwoComponent } from './User/user-table-two/user-table-two.component';
import { UserTabThreeComponent } from './User/user-tab-three/user-tab-three.component';
import { UserTableThreeComponent } from './User/user-table-three/user-table-three.component';
import { LoginComponent } from '../login/login.component';
import { FrameworkModule } from '../Framework/framework.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CourseService } from './Services/course.service';
import { DataService } from './Services/data.service';
import { ShopService } from './Services/shop.service';
import { UserinfoService } from './Services/userinfo.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [
    UserTabComponent,
    UserTableOneComponent,
    UserTabOneComponent,
    UserTabTwoComponent,
    UserTableTwoComponent,
    UserTabThreeComponent,
    UserTableThreeComponent,
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
    UserTabComponent,
    UserTableOneComponent,
    UserTabOneComponent,
    UserTabTwoComponent,
    UserTableTwoComponent,
    UserTabThreeComponent,
    UserTableThreeComponent,
    NavBarComponent,
    LoginComponent,
    FrameworkModule,
    TabsetComponent
  ]
})
export class SharedModule { }
