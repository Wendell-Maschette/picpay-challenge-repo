import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Account } from '../models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'http://localhost:3030'; 

  constructor(private http: HttpClient) {}

  login(enteredAccount: Account): Observable<boolean> {
    return this.http.get<any[]>(`${this.dbUrl}/account`).pipe(
      map(accounts => {
        const account = accounts.find(accountAlready => accountAlready.email === enteredAccount.email && accountAlready.password === enteredAccount.password);
        return !!account; 
      }),
      catchError(() => of(false))
    );
  }

  registerAccount(newAccount: Account) {
    return this.http.get<any[]>(`${this.dbUrl}/account`).pipe(
      map(accounts => {
        const hasAccount = accounts.find(acc => acc.email === newAccount.email);
        if (hasAccount) {
          return false;
        } else {
          return this.http.post<Account>(`${this.dbUrl}/account`, newAccount);
        }
      }),
      catchError(() => of(false))
    );
  }
}
