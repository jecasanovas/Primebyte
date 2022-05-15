import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateGuard } from '../canactivate.guard';
import { BasketComponent } from './basket/basket.component';
import { CheckoutTabComponent } from './checkout-tab/checkout-tab.component';
import { CoursesDetailComponent } from './courses-detail/courses-detail.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanactivateGuard],
  },

  {
    path: 'shop',
    component: CoursesListComponent,
    canActivate: [CanactivateGuard],
  },


  {
    path: 'coursedetail/:id',
    component: CoursesDetailComponent,
    canActivate: [CanactivateGuard],
  },

  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [CanactivateGuard],
  },
  {
    path: 'checkout',
    component: CheckoutTabComponent,
    canActivate: [CanactivateGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceRoutingModule { }
