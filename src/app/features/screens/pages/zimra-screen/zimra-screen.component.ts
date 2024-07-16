import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TransactionService} from "../../services/transaction.service";
import {SubscriptionsManager} from "../../../../core/helpers/SubscriptionsManager";
import {AuthService} from "../../../auth/services/auth.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {DatePipe} from "@angular/common";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-zimra-screen',
  templateUrl: './zimra-screen.component.html',
  styleUrls: ['./zimra-screen.component.scss'],
  providers: [DatePipe]
})
export class ZimraScreenComponent implements OnInit, OnDestroy{

  presetColors = ["pink", "red", "yellow", "orange", "cyan", "green", "blue", "purple", "geekblue", "magenta", "volcano", "gold", "lime"]

  constructor(
    private router:Router,
    private transactionService: TransactionService,
    private authService: AuthService,
    private nzMessageService: NzMessageService,
    private datePipe: DatePipe,
    private notification: NzNotificationService
  ) {
  }

  newZimraPayment() {
    setTimeout(() => {
      this.router.navigateByUrl('screens/main/new-zimra-transaction');
    }, 100);
  }

    changePage(changeDirection: string) {
        switch (changeDirection){
            case 'next':
                this.page = this.page + 1;
                break;
            case 'previous':
                this.page = this.page - 1;
                break;
            case 'page':
                this.page = 1;
                break;
        }

    }

  pagination?: any;

    pageChange(event: any) {
      this.page = event;
      this.getTransactions();
    }

  ngOnInit(): void {
    this.page = 0;
    this.limit = 10;
    this.status = "ALL";
    this.getTransactions();
    this.subs.add = this.transactionService.$transactions.subscribe((response: any) => {
      console.log(response)
      this.transactions = response.data.content;
      this.pagination = response.data
      this.getTransactionsLoader = false;
    })
    this.subs.add = this.transactionService.$transaction.subscribe((response: any) => {
      console.log(response)
      this.transaction = response.data;
    })
    this.subs.add = this.transactionService.$actionTransaction.subscribe((response: any) => {
      console.log(response)
      if (response.success) {
        this.notification.create(
          'success',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
      } else {
        this.notification.create(
          'error',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
      }
      this.getTransactions()
      this.actionTransactionLoader = false;
    })
    this.subs.add = this.transactionService.$processTransaction.subscribe((response: any) => {
      if (response.success) {
        this.notification.create(
          'success',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
      } else {
        this.notification.create(
          'error',
          response.message,
          response.detail,
          { nzPlacement: 'bottom' }
        )
      }
      console.log(response)
      this.getTransactions()
    })
  }

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  page?: any;
  limit?: any;
  status?: any;

  getTransactions() {
    this.getTransactionsLoader = true;
    this.transactionService.getTransactions({}, this.page, this.limit, this.status);
  }

  filterTransactions(status: any) {
    this.status = status;
    this.getTransactions();
  }

  getTransactionsLoader?: boolean;
  actionTransactionLoader?: boolean;

  transactions?: any;
  transaction?: any;
  user = this.authService.getUser();

  replaceUnderscoreWithSpace(value: string): string {
    return value.replace(/_/g, ' ');
  }

  transactionStatus: any = {
    "COMPLETED" : "green",
    "FAILED" : "red",
    "CANCELLED" : "volcano",
    "PROCESSING" : "orange",
    "PENDING_AWAITING_AUTHORISATION" : "orange",
    "PENDING_WAITING_PROCESSING" : "blue",
    "DECLINED" : "red",
  };

  cancel(): void {
    this.nzMessageService.info('click cancel');
  }




  subs = new SubscriptionsManager();

  viewTransaction(id: any) {
    this.showModal();
    this.transactionService.getTransaction(id);
  }

  actionRequest = {
    transactionId: "",
    action: "",
    comment: "dummy comment"
  }


  actionTransaction(id: any, action: any) {
    this.actionTransactionLoader = true;
    this.actionRequest.transactionId = id;
    this.actionRequest.action = action;
    this.transactionService.actionTransaction(this.actionRequest);
  }


  printPOP(transactionId: any) {
    this.router.navigateByUrl('screens/main/zimra-payment-pop/' + transactionId);
  }

  processTransaction(id: any) {
    let transactionToProcess = this.transactions.filter((transactionItem: any) => transactionItem.id === id)
    transactionToProcess.status = "PROCESSING"
    this.transactionService.processTransaction(id);
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return  this.datePipe.transform(date, 'd MMMM yyyy');
  }


  ngOnDestroy(){
    this.subs.dispose();
  }

  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {

  }

  changeZWLtoZiG(currencyCode: string) : string {
    if (currencyCode == 'ZWL') {
      return 'ZiG'
    } else {
      return currencyCode;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
