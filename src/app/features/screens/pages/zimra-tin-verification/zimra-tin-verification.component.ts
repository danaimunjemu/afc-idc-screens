import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../../services/transaction.service";
import {SubscriptionsManager} from "../../../../core/helpers/SubscriptionsManager";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-zimra-tin-verification',
  templateUrl: './zimra-tin-verification.component.html',
  styleUrls: ['./zimra-tin-verification.component.scss']
})
export class ZimraTinVerificationComponent implements OnInit{

  constructor(
    private transactionService: TransactionService,
    private notification: NzNotificationService
  ) {
  }


  tinVerificationRequest = {
    tellerId: "",
    tin: "",
    payerFullName: "",
    payerIdNumber: "",
    paymentType: "CASH",
    sourceAccount: "NA",
    sourceAccountCurrency: "",
    payerMobileNumber: "",
    userReference: "",
    taxType: "",
    amount: "",
    tinVerification: true,
    billAuthResponse: {}
  }

  authData?: any;
  fetchDetailsLoader?: boolean;

  fetchAuthDetails() {
    this.authData = null;
    this.fetchDetailsLoader = true;
    this.transactionService.fetchAuthDetails(this.tinVerificationRequest);
  }

  currencyConverter(currencyCode: string) : string {
    if (currencyCode == 'ZWL' || currencyCode == 'ZiG') {
      return 'ZWG'
    } else {
      return currencyCode;
    }
  }

  ngOnInit(): void {
    this.subs.add = this.transactionService.$fetchAuthDetails.subscribe((response: any) => {
      console.log(response)
      this.fetchDetailsLoader = false;
      if (response.success) {
        this.authData = response.data;
        this.notification.create(
          'success',
          "Success",
          response.message,
          { nzPlacement: 'bottom' }
        )
      } else {
        this.notification.create(
          'error',
          "Error",
          response.message,
          { nzPlacement: 'bottom' }
        )
      }
    });
  }

  subs = new SubscriptionsManager();

  ngOnDestroy(){
    this.subs.dispose();
  }

}
