import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScreensRoutingModule } from './screens-routing.module';
import { LayoutComponent } from './layout/layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AntDesignModules} from "../../core/modules/antdesign.module";
import { ZimraScreenComponent } from './pages/zimra-screen/zimra-screen.component';
import { NewZimraTransactionComponent } from './pages/new-zimra-transaction/new-zimra-transaction.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import { ZimraPaymentPopComponent } from './pages/zimra-payment-pop/zimra-payment-pop.component';
import { ZimraTinVerificationComponent } from './pages/zimra-tin-verification/zimra-tin-verification.component';
import {NzTypographyModule} from "ng-zorro-antd/typography";
import { AdminCreateUserComponent } from './pages/admin-create-user/admin-create-user.component';
import { AdminListUsersComponent } from './pages/admin-list-users/admin-list-users.component';


@NgModule({
  declarations: [
    LayoutComponent,
    ZimraScreenComponent,
    NewZimraTransactionComponent,
    ZimraPaymentPopComponent,
    ZimraTinVerificationComponent,
    AdminCreateUserComponent,
    AdminListUsersComponent,
  ],
    imports: [
        CommonModule,
        ScreensRoutingModule,
        FormsModule,
        AntDesignModules,
        ReactiveFormsModule,
        NzInputNumberModule,
        NzTypographyModule
    ]
})
export class ScreensModule { }
