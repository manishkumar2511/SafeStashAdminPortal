import { Injectable } from '@angular/core';
import { Login } from '../shared/models/login';
import { Observable, map } from 'rxjs';
import { AccountResponse } from '../shared/models/AccountResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiurl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  login(model: Login): Observable<any> {
    var data = this.http.post<AccountResponse>(`${this.apiurl}Account/Login`, model)
    return data;
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
