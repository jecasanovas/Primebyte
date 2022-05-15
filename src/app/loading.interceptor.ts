import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';


import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from './Framework/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url.includes('orders')) {
      return next.handle(req);
    }
    if (req.method === 'DELETE') {
      return next.handle(req);
    }
    if (req.url.includes('emailexists')) {
      return next.handle(req);
    }
    this.loadingService.loading();
    return next.handle(req).pipe(
      finalize(() => {
        this.loadingService.idle();
      })
    );
  }
}
