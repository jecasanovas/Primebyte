import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  busyRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) {}

  loading() {
    this.busyRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'ball-spin',
      size: 'medium',
      fullScreen: true,
      bdColor: 'rgba(0, 0, 0, 0.1)',
      color: 'white',
    });
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
