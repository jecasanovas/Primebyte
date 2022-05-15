import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateGuard } from '../canactivate.guard';
import { LoginComponent } from '../login/login.component';
import { UserTabComponent } from './User/user-tab/user-tab.component';

const routes: Routes = [
  {
    path: 'users',
    component: UserTabComponent,
    canActivate: [CanactivateGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
