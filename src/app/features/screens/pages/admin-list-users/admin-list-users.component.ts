import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TransactionService} from "../../services/transaction.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {SubscriptionsManager} from "../../../../core/helpers/SubscriptionsManager";

@Component({
  selector: 'admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss']
})
export class AdminListUsersComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private nzMessageService: NzMessageService,
    private notification: NzNotificationService
  ) {
  }

  getUsersLoader?: boolean;
  users?: any;

  subs = new SubscriptionsManager();

  gotoCreateUserPage() {
    this.router.navigateByUrl('/screens/main/zimra-add-user').then(r => true);
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.subs.add = this.transactionService.$users.subscribe((response: any) => {
      this.getUsersLoader = false;

      console.log(response)

      if (response.success) {
        this.users = response.data;

        this.notification.create(
          'success',
          "Success",
          "users fetched successfully",
          {nzPlacement: 'bottom'}
        )
      } else {
        this.notification.create(
          'error',
          "Error",
          response.message,
          {nzPlacement: 'bottom'}
        )
      }

    })
  }

  getAllUsers() {
    this.getUsersLoader = true;
    this.transactionService.getUsers();
  }

  ngOnDestroy() {
    this.subs.dispose();
  }
}
