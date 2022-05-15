import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { observable, Observable } from 'rxjs';
import { AutorizationService } from './autorization.service';

@Injectable({
  providedIn: 'root',
})
export class CanactivateGuard implements CanActivate {
  constructor(private access: AutorizationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((obs) => {
      this.access.CheckAccess().subscribe(
        (data: boolean) => {
          obs.next(data);
          if (!data) this.router.navigateByUrl('');
        },
        (error) => {
          obs.next(false);
          this.router.navigateByUrl('');
        }
      );
    });
  }
}
