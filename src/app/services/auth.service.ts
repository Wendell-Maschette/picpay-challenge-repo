import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Account } from '../models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'http://localhost:3030';
  private isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(enteredAccount: Account): Observable<boolean> {
    return this.http.get<Account[]>(`${this.dbUrl}/account`).pipe(
      map((accounts) => {
        const account = accounts.find(
          (accountAlready) =>
            accountAlready.email === enteredAccount.email &&
            accountAlready.password === enteredAccount.password
        );

        !!account ? this.isAuthenticated = true : this.isAuthenticated = false;

        return !!account;
      }),
      catchError(() => {
        this.isAuthenticated = false;
        return of(false);
      })
    );
  }

  logout(): void {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  registerAccount(newAccount: Account): Observable<boolean> {
    return this.http.get<Account[]>(`${this.dbUrl}/account`).pipe(
      switchMap((accounts:any) => {
        const hasAccount = accounts.find((acc: any) => acc.email === newAccount.email);
        if (hasAccount) {
          return of(false); 
        } else {
          return this.http.post<Account>(`${this.dbUrl}/account`, newAccount).pipe(
            map(() => true), 
            catchError(() => of(false)) 
          );
        }
      }),
      catchError(() => of(false))
    );
  }
  
}
