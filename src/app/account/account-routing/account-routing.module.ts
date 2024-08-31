import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { SendEmailComponent } from '../send-email/send-email.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  //{ path: 'send-email/:mode', component: SendEmailComponent }, i have to implement like this 
  { path: 'send-email/forget-password', component: SendEmailComponent },//temporary

  //{ path: 'reset-password', component: ResetPasswordComponent },
  //{ path: 'confirm-email', component: ConfirmEmailComponent },
  //{ path: 'send-2fa-code/:mode', component: SendTwoFactorAuthenticationCodeComponent },
  //{ path: 'verify-number', component: VerifyPhoneNumberComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
}) export class AccountRoutingModule { }
