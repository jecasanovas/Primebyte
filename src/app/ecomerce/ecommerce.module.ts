import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { CheckoutTabComponent } from './checkout-tab/checkout-tab.component';
import { CheckoutTab1Component } from './checkout-tab1/checkout-tab1.component';
import { CheckoutTab2Component } from './checkout-tab2/checkout-tab2.component';
import { ShopComponent } from './shop/shop.component';
import { BasketComponent } from './basket/basket.component';
import { CheckoutTab3Component } from './checkout-tab3/checkout-tab3.component';
import { SharedModule } from '../Shared/shared.module';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    CoursesListComponent,
    HomeComponent,
    CourseComponent,
    ShopComponent,
    BasketComponent,
    CheckoutTabComponent,
    CheckoutTab1Component,
    CheckoutTab2Component,
    CheckoutTab3Component,
    CoursesDetailComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    EcommerceRoutingModule,
    SharedModule,
    CarouselModule.forRoot()
  ],

})
export class EcommerceModule { }
