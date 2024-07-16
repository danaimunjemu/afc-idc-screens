import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/features/auth/services/auth.service';
// import {AuthService} from "../../../features/auth/services/auth.service";


@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  serviceData: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
    ) { }

  private subject = new Subject<any>();
  isLoading = new Subject();

  lastErrorMessage: string = '';

  sendClickEvent(value:any) {
    this.serviceData=value;
    this.subject.next(value);
  }

    getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  // Handling HTTP Errors using Toaster
  public handleError(err: HttpErrorResponse) {


    let errorMessage: any;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      switch (err.status) {
        case 400:
          errorMessage = `Bad Request. ${err.error.message}`;
          break;
        case 401:
          errorMessage = `You need to log in to do this action. ${err.error.message}`;
          console.log("The URL I was trying to visit: ", err.url);
          localStorage.setItem('redirectUrl', JSON.stringify(err.url));
          this.authService.logout()
          this.router.navigateByUrl('auth');
          break;
        case 403:
          errorMessage = `You don't have permission to access the requested resource. ${err.error.message}`;
          this.authService.logout()
          this.router.navigateByUrl('auth');
          break;
        case 404:
          errorMessage = `${err.error.message}`;
          // this.authService.logout()
          // this.router.navigateByUrl('auth');
          break;
        case 412:
          errorMessage = `Precondition Failed. ${err.error.message}`;
          break;
        case 500:
          errorMessage = `Internal Server Error. ${err.error.message}`;
          break;
        case 503:
          errorMessage = `The requested service is not available. ${err.error.message}`;
          break;
        case 422:
          errorMessage = `Validation Error! ${err.error.message}`;
          break;
        case 900:
          if (err.error.statusCode == 403) {
            // this.router.navigateByUrl('app/403');
            this.authService.logout();
            this.router.navigateByUrl('auth');
          }
          if (err.error.statusCode == 401) {
            this.authService.logout();
            this.router.navigateByUrl('auth');
          }
          errorMessage = `${err.error.message}`;
          break;
        default:
          errorMessage = `${err.error.message}`;
      }
    }
    if (errorMessage && errorMessage !== this.lastErrorMessage) {
      // Update the last error message
      this.lastErrorMessage = errorMessage;
      this.sendClickEvent(false);
      this.isLoading.next(false);
      this.notification.create(
        'error',
        'Error ' + err.error.statusCode,
        errorMessage
      );
      console.log(errorMessage)
      // this.error( "Error", errorMessage)
    }
  }
}
