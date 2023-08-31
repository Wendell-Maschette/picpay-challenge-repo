import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbUrl = 'http://localhost:3030'; 

  constructor(private http: HttpClient) {}

  login(body: any): Observable<boolean> {
    return this.http.get<any[]>(`${this.dbUrl}/account`).pipe(
      map(accounts => {
        const account = accounts.find(acc => acc.email === body.email && acc.password === body.password);
        return !!account; 
      }),
      catchError(() => of(false))
    );
  }
}
