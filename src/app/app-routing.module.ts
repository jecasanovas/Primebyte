import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
    {
      path:'login',
      component:LoginComponent
    }, {

      path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(
      module => module.AdminModule
    )
  },
  {
    path: 'ecommerce',
    loadChildren: () => import('./ecomerce/ecommerce.module').then(
      module => module.EcommerceModule
    )
  },
  {   path: '',redirectTo: 'login', pathMatch: 'full'},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
