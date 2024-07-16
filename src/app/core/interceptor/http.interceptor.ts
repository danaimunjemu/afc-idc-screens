import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';
// import { AuthService } from "../../features/auth/services/auth.service";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    // request = request.clone();


// console.log('Request was intercepted')

    // let browser = this.checkBrowser();
    // let networkType = this.checkNetworkType();
    // let agentDevice = this.checkAgentDevice();
    let token = this.authService.getToken();

    let headers = new HttpHeaders()
        .set('Authorization', 'Bearer ' + token)
        // .set('x-gateway-origin', 'client')
        // .set('x-authorise-admin', 'admin@authorise.net')
        .set('Access-Control-Allow-Origin', '*')
        // .set('x-afc-browser', browser)
        // .set('x-afc-network-type', networkType)
        // .set('x-afc-agent-device', agentDevice)
        // .set('x-afc-user-email', this.authService.getUser().email)


    request = request.clone({ headers });

    console.log(request)






    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // console.log('event--->>>', event);
        }
        return event;
      }));
  }

  checkBrowser(): string {
    const windowAny = window as any; // Type assertion to 'any' to bypass type checking

    const isOpera = (!!windowAny.opr && !!windowAny.opr.addons) || !!windowAny.opera || navigator.userAgent.indexOf('OPR/') >= 0;
    const isFirefox = typeof windowAny.InstallTrigger !== 'undefined';
    const isSafari = /constructor/i.test(windowAny.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!windowAny['safari'] || windowAny.safari.pushNotification);
    const isIE = /*@cc_on!@*/!!document.DOCUMENT_NODE;
    const isEdge = !isIE && !!windowAny.StyleMedia;
    const isChrome = !!windowAny.chrome && (!!windowAny.chrome.webstore || !!windowAny.chrome.runtime);
    const isBlink = (isChrome || isOpera) && !!windowAny.CSS;

    if (isFirefox) return 'Firefox';
    if (isChrome) return 'Chrome';
    if (isSafari) return 'Safari';
    if (isOpera) return 'Opera';
    if (isIE) return 'IE';
    if (isEdge) return 'Edge';
    if (isBlink) return 'Blink';
    return "Other";

  }

  checkNetworkType() {
    // @ts-ignore
    var networkState = navigator['connection'].effectiveType
    return networkState
  }


  checkAgentDevice() {
    const ua = navigator.userAgent;

    if (/Macintosh/i.test(ua)) {
      return 'MacBook';
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      return 'iPhone';
    } else if (/Android/i.test(ua)) {
      return 'Android';
    } else if (/Windows|Linux|Ubuntu/i.test(ua)) {
      return  'Desktop';
    } else {
      return  'Other';
    }
  }

  constructor(private authService:AuthService) { }
  //
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   let token = this.authService.Token;
  //   request = request.clone({ headers: request.headers.set('ApplicationTag', 'flex') });
  //
  //
  //   if (token) {
  //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
  //   }
  //
  //   console.log(request)
  //
  //
  //   // if (!request.headers.has('Content-Type')) {
  //   //   request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
  //   // }
  //   //
  //   // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
  //
  //
  //
  //   return next.handle(request).pipe(
  //     map((event: HttpEvent<any>) => {
  //       if (event instanceof HttpResponse) {
  //         // console.log('event--->>>', event);
  //       }
  //       return event;
  //     }));
  // }
}
