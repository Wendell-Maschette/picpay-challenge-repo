import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import { Account } from '../../models/account.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'http://localhost:3030';
  private isAuthenticated = false;

  router = inject(Router)
  http = inject(HttpClient)

  login(enteredAccount: Account): Observable<boolean> {
    return this.http.get<Account[]>(`${this.dbUrl}/account`).pipe(
      map((accounts) => {
        const authenticated = accounts.some(
          (account) =>
            account.email === enteredAccount.email &&
            account.password === enteredAccount.password
        );
  
        if (authenticated) {
          localStorage.setItem('userLogged', enteredAccount.email);
          this.isAuthenticated = true;
        } else {
          localStorage.removeItem('userLogged');
          this.isAuthenticated = false;
        }
  
        return authenticated;
      }),
      catchError(() => {
        this.isAuthenticated = false;
        return of(false); // Erro na requisição
      })
    );
  }

  logout(): void {
    localStorage.removeItem('userLogged');
    this.isAuthenticated = false;
    this.router.navigate(['']);
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  registerAccount(newAccount: Account): Observable<boolean> {
    return this.http.get<Account[]>(`${this.dbUrl}/account`).pipe(
      switchMap((accounts: any) => {
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
