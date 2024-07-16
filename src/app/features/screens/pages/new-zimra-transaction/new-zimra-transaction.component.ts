import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {SubscriptionsManager} from "../../../../core/helpers/SubscriptionsManager";
import {TransactionService} from "../../services/transaction.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-new-zimra-transaction',
  templateUrl: './new-zimra-transaction.component.html',
  styleUrls: ['./new-zimra-transaction.component.scss']
})
export class NewZimraTransactionComponent implements OnInit, OnDestroy {

  constructor(
    private router:Router,
    private transactionService: TransactionService,
    private notification: NzNotificationService
  ) {
  }

  onBack(): void {
    setTimeout(() => {
      this.router.navigateByUrl('screens/main/zimra-screen');
    }, 100);
  }

  zimraPaymentRequest = {
    tellerId: "",
    tin: "",
    payerFullName: "",
    payerIdNumber: "",
    paymentType: "TRANSFER",
    sourceAccount: "",
    sourceAccountCurrency: "",
    payerMobileNumber: "",
    userReference: "",
    taxType: "",
    amount: "",
    billAuthResponse: {}
  }

  areAllFieldsEmpty(): boolean {
    const { tellerId, tin, payerFullName, payerIdNumber, paymentType, sourceAccount, sourceAccountCurrency, payerMobileNumber, userReference, taxType, amount } = this.zimraPaymentRequest;
    return !tellerId && !tin && !payerFullName && !payerIdNumber && !paymentType && !sourceAccount && !sourceAccountCurrency && !payerMobileNumber && !userReference && !taxType && !amount;
  }

  changeZWLtoZiG(currencyCode: string) : string {
    if (currencyCode == 'ZWL') {
      return 'ZiG'
    } else {
      return currencyCode;
    }
  }

  checkFetchAuthFields () {}
  checkBillPaymentFields () {}

  fetchDetailsLoader?: boolean;
  billPaymentLoader?: boolean;
  fetchAuthDetails() {
    this.authData = null;
    this.fetchDetailsLoader = true;
    console.log(this.zimraPaymentRequest);
    this.transactionService.fetchAuthDetails(this.zimraPaymentRequest);
  }

  authData?: any;
  authResponse?: any;


  ngOnInit(): void {
    this.subs.add = this.transactionService.$newTransaction.subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.notification.create(
          'success',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
        this.router.navigateByUrl('screens/main/zimra-screen');
      } else {
        this.notification.create(
          'error',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
      }
      this.billPaymentLoader = false;
    });
    this.subs.add = this.transactionService.$fetchAuthDetails.subscribe((response: any) => {
      console.log(response)
      this.fetchDetailsLoader = false;
      if (response.success) {

        if (response.enquiry) {
          this.zimraPaymentRequest.sourceAccountCurrency = response.enquiry.additionalData.ACCOUNT_ENQUIRY.CURRENCY
          this.zimraPaymentRequest.billAuthResponse = response.data.BILL_AUTH_RESPONSE;
          this.authData = response.data;
          this.authResponse = response;
          console.log(this.zimraPaymentRequest);
          this.notification.create(
            'success',
            'Success',
            response.message,
            { nzPlacement: 'bottom' }
          );
          this.current += 1;
        } else {
          this.notification.create(
            'error',
            "Failed to fetch account",
            "The account number " + this.zimraPaymentRequest.sourceAccount + " was not found",
            { nzPlacement: 'bottom' }
          )
        }


      } else {
        this.notification.create(
          'error',
          'Failed',
          response.message,
          { nzPlacement: 'bottom' }
        )
      }
    });
  }



  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }

  cancelPreOne(): void {
    // do nothing
  }

  confirmToPreOne(): void {
    this.pre();
    this.zimraPaymentRequest = {
      tellerId: "",
      tin: "",
      payerFullName: "",
      payerIdNumber: "",
      paymentType: "TRANSFER",
      sourceAccount: "",
      sourceAccountCurrency: "",
      payerMobileNumber: "",
      userReference: "",
      taxType: "",
      amount: "",
      billAuthResponse: {}
    }
  }

  confirmDetails() {
    // to step 3
    this.next();
  }

  billPayment() {
    this.billPaymentLoader = true;
    this.transactionService.createNewTransaction(this.zimraPaymentRequest);
  }

  subs = new SubscriptionsManager();

  ngOnDestroy(){
    this.subs.dispose();
  }

}
