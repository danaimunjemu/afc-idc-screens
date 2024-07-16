import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { HandleErrorService } from './handle-error.service';


@Injectable({
  providedIn: 'root'
})
export class ServerErrorsInterceptorService {

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // returning an observable to complete the request cycle
    return new Observable((observer) => {
      next.handle(req).subscribe(
        (res: HttpEvent<any>) => {
          if (res instanceof HttpResponse) {
            observer.next(res);
          }
        },
        (err: HttpErrorResponse) => {
          if (err.url != 'http://localhost:4200/') {
            this.error.handleError(err);
            console.warn("Global error that occurred",err);
          }
        }
      );
    });
  }

  constructor(private error: HandleErrorService) { }
}
