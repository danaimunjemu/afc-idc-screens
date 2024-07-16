import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subject} from "rxjs";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  $newTransaction = new Subject();
  $fetchAuthDetails = new Subject();
  $transaction = new Subject();
  $transactions = new Subject();
  $actionTransaction  = new Subject();
  $processTransaction  = new Subject();

  fetchAuthDetails(request: any) {
    this.http.post(environment.screens_server + 'zimra-data/fetch-auth',  request).subscribe((response: any) => {
      this.$fetchAuthDetails.next(response);
    });
  }

  createNewTransaction(request: any) {
    this.http.post(environment.screens_server + 'transactions/create',  request).subscribe((response: any) => {
      this.$newTransaction.next(response);
    });
  }

  getTransaction(request: any) {
    this.http.get(environment.screens_server + 'transactions/' + request).subscribe((response: any) => {
      this.$transaction.next(response);
    });
  }

  getTransactions(request: any, page: number, limit: number, status: string) {
    let params = new HttpParams()
      .set('page', page || '')
      .set('limit', limit || '')
      .set('status', status || '');
    this.http.get(environment.screens_server + 'transactions', {params}).subscribe((response: any) => {
      this.$transactions.next(response);
    });
  }

  actionTransaction(request: any) {
    this.http.put(environment.screens_server + 'transactions/action', request).subscribe((response: any) => {
      this.$actionTransaction.next(response);
    });
  }

  processTransaction(request: any) {
    this.http.put(environment.screens_server + 'transactions/process/' + request, {}).subscribe((response: any) => {
      this.$processTransaction.next(response);
    });
  }

}
