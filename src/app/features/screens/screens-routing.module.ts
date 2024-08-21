import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./layout/layout.component";
import {ZimraScreenComponent} from "./pages/zimra-screen/zimra-screen.component";
import {NewZimraTransactionComponent} from "./pages/new-zimra-transaction/new-zimra-transaction.component";
import {ZimraPaymentPopComponent} from "./pages/zimra-payment-pop/zimra-payment-pop.component";
import {ZimraTinVerificationComponent} from "./pages/zimra-tin-verification/zimra-tin-verification.component";
import {AdminListUsersComponent} from "./pages/admin-list-users/admin-list-users.component";
import {AdminCreateUserComponent} from "./pages/admin-create-user/admin-create-user.component";

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'zimra-tin-verification', pathMatch: 'full' },
      { path: 'zimra-screen', component: ZimraScreenComponent, },
      { path: 'new-zimra-transaction', component: NewZimraTransactionComponent, },
      { path: 'zimra-tin-verification', component: ZimraTinVerificationComponent, },
      { path: 'zimra-payment-pop/:id', component: ZimraPaymentPopComponent, },
      { path: 'zimra-users', component: AdminListUsersComponent , },
      { path: 'zimra-add-user', component: AdminCreateUserComponent, },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreensRoutingModule { }
