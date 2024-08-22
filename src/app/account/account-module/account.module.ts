import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AccountRoutingModule } from '../account-routing/account-routing.module';
import { LoginComponent } from '../login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    
    AccountRoutingModule,
    SharedModule
    
  ]
})
export class AccountModule { }
