import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';
import { HandleErrorService } from 'src/app/core/services/error-handling/handle-error.service';
import {NzNotificationService} from "ng-zorro-antd/notification";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(
    private authService: AuthService,
    private router: Router,
    private notification: NzNotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.getToken()) {
      return true;
    } else {
      console.error("Unauthorised user");
      this.notification.create(
        'error',
        'Unauthenticated',
        'Please log in'
      );
      this.router.navigateByUrl('');
      return false
    }
  }

}
