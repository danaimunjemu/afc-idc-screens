import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { SubscriptionsManager } from "../../../../core/helpers/SubscriptionsManager";
import {AuthService} from "../../services/auth.service";
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = {
    email: "",
    password: ""
  }

  loginLoader?: boolean;


  submitForm(): void {
    this.loginLoader = true;
    this.authService.authenticate(this.loginForm);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService,
    private notification: NzNotificationService
  ) {}

  subs = new SubscriptionsManager();

  ngOnInit(): void {
    this.subs.add = this.authService.$login.subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.notification.create(
          'success',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        );
        setTimeout(() => {
          this.router.navigateByUrl('screens/main');
        }, 100);
      } else {
        this.notification.create(
          'error',
          response.message,
          response.detail
        );
      }
      this.loginLoader = false;
    })
  }


  ngOnDestroy(){
    this.subs.dispose();
  }

}
