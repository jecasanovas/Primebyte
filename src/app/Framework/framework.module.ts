import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextNgInputComponent } from '../Framework/text-input/text-input.component';
import { SelectInputComponent } from '../Framework/select-input/select-input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDropdownModule, BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TabsetComponent, TabsModule } from 'ngx-bootstrap/tabs';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   TextNgInputComponent,
   SelectInputComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    PaginationModule.forRoot(),
    NgSelectModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule,
  ReactiveFormsModule],
    exports:[
      FontAwesomeModule,
      TextNgInputComponent,
      SelectInputComponent,
      TabsetComponent,
      NgxSpinnerModule,
      TabsModule,
      PaginationModule,
      BsDropdownModule,

    ],
    providers:[BsDropdownConfig]
})
export class FrameworkModule { }
