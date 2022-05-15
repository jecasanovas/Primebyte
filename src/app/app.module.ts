import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptor } from './error.interceptor';
import { LoadingInterceptor } from './loading.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { SharedModule } from './Shared/shared.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    SharedModule

 ],
 providers:[
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
 ],

  bootstrap: [AppComponent],
})
export class AppModule {}
