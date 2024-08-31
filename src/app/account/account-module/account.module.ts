import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AccountRoutingModule } from '../account-routing/account-routing.module';
import { LoginComponent } from '../login/login.component';
import { SendEmailComponent } from '../send-email/send-email.component';



@NgModule({
  declarations: [
    LoginComponent,
    SendEmailComponent
  ],
  imports: [
    
    AccountRoutingModule,
    SharedModule
    
  ]
})
export class AccountModule { }
