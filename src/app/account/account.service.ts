import { Injectable } from '@angular/core';
import { Login } from '../shared/models/login';
import { Observable, map } from 'rxjs';
import { AccountResponse } from '../shared/models/AccountResponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient
  ) { }

  login(model: Login): Observable<any> {
   
    return this.http.post<AccountResponse>(`/account/login`, model)
      //.pipe(
      //  map((user: AccountResponse) => {
      //    debugger
      //    if (user.data && user.succeeded && !user.requiresTwoFactor && !user.requiresPhoneNumberConfirmed) {
      //     // this.setUser(user.data);
      //      return user
      //    }
      //    else {
      //      return user;
      //    }

      //    return null;
      //  })
      //);
  }
}
