import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Account } from '../../models/account.interface';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, Router ],
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return true for a valid account on login', () => {
    const mockAccounts: Account[] = [
      { email: 'test@example.com', password: 'password' },
      { email: 'another@example.com', password: '123456' },
    ];

    const testAccount: Account = { email: 'test@example.com', password: 'password' };
    expect(authService.isAuthenticatedUser()).toBeFalsy();

    authService.login(testAccount).subscribe((result) => {
      expect(result).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:3030/account');
    expect(req.request.method).toEqual('GET');

    req.flush(mockAccounts);
    expect(authService.isAuthenticatedUser()).toBeTruthy();

    httpTestingController.verify();
  });

  it('should return false for an invalid account on login', fakeAsync(() => {
    const mockAccounts: Account[] = [
      { email: 'test@example.com', password: 'password' },
      { email: 'another@example.com', password: '123456' },
    ];
    
    let loginResult: boolean | undefined;
    
    authService.login({ email: 'invalid@example.com', password: 'invalidpassword' }).subscribe((result) => {
      loginResult = result;
      tick(1000);
    });

    
    const req = httpTestingController.expectOne('http://localhost:3030/account');
    expect(req.request.method).toEqual('GET');
    
    req.flush(mockAccounts);
    
    tick(1000);
    
    expect(loginResult).toBeFalsy();
    expect(authService.isAuthenticatedUser()).toBeFalsy();
  }));

  it('should handle server error on login', () => {
    const invalidAccount: Account = { email: 'test@example.com', password: 'password' };

    authService.login(invalidAccount).subscribe({
      next: (result) => {
        expect(result).toBeFalsy();
      },
      error: (error) => {
        expect(error).toBeDefined();
      },
    });

    const req = httpTestingController.expectOne('http://localhost:3030/account');
    expect(req.request.method).toEqual('GET');

    req.error(new ErrorEvent('Network error', {
      message: 'Simulated server error',
    }));

    expect(authService.isAuthenticatedUser()).toBeFalsy();

  });

  it('should create an account successfully', () => {
    const newAccount: Account = {
      email: 'test@example.com',
      password: 'password123',
    };

    authService.registerAccount(newAccount).subscribe((result) => {
      expect(result).toBeTrue();
    });

    const getAccountsReq = httpTestingController.expectOne('http://localhost:3030/account');
    expect(getAccountsReq.request.method).toEqual('GET');

    getAccountsReq.flush([]);

    const postAccountReq = httpTestingController.expectOne('http://localhost:3030/account');
    expect(postAccountReq.request.method).toEqual('POST');
    expect(postAccountReq.request.body).toEqual(newAccount);
    
    postAccountReq.flush({}); 
  });

  it('should return false if account already exists', () => {
    const existingAccount: Account = {
      email: 'test@example.com',
      password: 'password123',
    };

    authService.registerAccount(existingAccount).subscribe((result) => {
      expect(result).toBeFalse(); 
    });

    const getAccountsReq = httpTestingController.expectOne('http://localhost:3030/account');
    expect(getAccountsReq.request.method).toEqual('GET');

    getAccountsReq.flush([existingAccount]);
  });

  it('should handle network error during account creation', (done) => { 
    const newAccount: Account = {
      email: 'test@example.com',
      password: 'password123',
    };
  
    authService.registerAccount(newAccount).subscribe((result) => {
      expect(result).toBeFalse(); 
      done(); 
    });
  
    const getAccountsReq = httpTestingController.expectOne('http://localhost:3030/account');
    expect(getAccountsReq.request.method).toEqual('GET');
  
    getAccountsReq.error(new ErrorEvent('Network error', {
      message: 'Simulated network error',
    })); 
  });

  it('should set isAuthenticated to false and navigate to home', () => {
    spyOn(router, 'navigate');
    authService.logout();
    expect(authService.isAuthenticatedUser()).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });
  
});
