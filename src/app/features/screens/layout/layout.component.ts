import { Component } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  constructor(
    private authService: AuthService
  ) {
  }

  user = this.authService.getUser();

  logout() {
    this.authService.logout();
  }

}
