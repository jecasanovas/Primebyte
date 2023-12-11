import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanactivateGuard } from '../canactivate.guard';
import { LoginComponent } from '../login/login.component';


@NgModule({
  exports: [RouterModule]
})
export class SharedRoutingModule { }
