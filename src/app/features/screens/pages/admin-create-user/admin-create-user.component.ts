import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubscriptionsManager} from "../../../../core/helpers/SubscriptionsManager";
import {TransactionService} from "../../services/transaction.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'admin-create-user',
  templateUrl: './admin-create-user.component.html',
  styleUrls: ['./admin-create-user.component.scss']
})
export class AdminCreateUserComponent implements OnInit, OnDestroy {

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService
  ) {
  }

  newUserRequest = {
    email: "",
    role: "",
    branchName: ""
  }

  systemBranches?: any[];
  fetchDetailsLoader?: boolean;

  getBranches(users: any[]): string[] {
    const branches = users.map(user => user.branchName);
    return Array.from(new Set(branches));
  }

  createNewUser() {
    this.fetchDetailsLoader = true;
    console.log(this.newUserRequest);
    this.transactionService.createNewUser(this.newUserRequest);
    console.log("request send to server");
  }

  ngOnInit(): void {
    this.fetchDetailsLoader = true;
    this.transactionService.getUsers();

    this.subs.add = this.transactionService.$users.subscribe((response: any) => {
      console.log(response)
      this.fetchDetailsLoader = false;
      if (response.success) {
        this.systemBranches = this.getBranches(response.data);

        this.notification.create(
          'success',
          "Success",
          "branches fetched successfully",
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
    });

    this.subs.add = this.transactionService.$newUser.subscribe((response: any) => {
      console.log(response)
      this.fetchDetailsLoader = false;
      if (response.success) {
        this.newUserRequest = {
          email: "",
          role: "",
          branchName: ""
        };

        this.notification.create(
          'success',
          "Success",
          "user saved successfully",
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
    });
  }

  subs = new SubscriptionsManager();

  ngOnDestroy() {
    this.subs.dispose();
  }
}
