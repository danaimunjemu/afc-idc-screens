import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import { environment } from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  $login = new Subject();
  token!: string;
  user!: string;

  authenticate(request: any) {
    this.http.post(environment.screens_server + 'auth/authenticate', request).subscribe((response: any) => {
      if(response.success) {
        this.setToken(response.data.token);
        this.setUser(response.data.user)
      }
      this.$login.next(response);
    })
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('');
  }

  getToken() {
    return this.token || localStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  setUser(user: string): void {
    localStorage.setItem('user', JSON.stringify(user));
  }


}
