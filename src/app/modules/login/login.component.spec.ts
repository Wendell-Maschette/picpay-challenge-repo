import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ModalRegisterAccountComponent } from './components/modal-register-account/modal-register-account.component';
import { of } from 'rxjs';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageCode, SnackbarService } from 'src/app/shared/services/snack-bar/snackbar.service';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;
  let dialog: MatDialog;
  let authService: AuthService;
  let router: jasmine.SpyObj<Router>;
  let snackbarService: jasmine.SpyObj<SnackbarService>;

  beforeEach(() => {
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'close']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const snackbarServiceSpy = jasmine.createSpyObj('SnackbarService', ['showSnackbar']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialog, useValue: dialogSpy },
        { provide: Router, useValue: routerSpy },
        { provide: SnackbarService, useValue: snackbarServiceSpy },
        AuthService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    snackbarService = TestBed.inject(SnackbarService) as jasmine.SpyObj<SnackbarService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should openDialog', () => {

    const dialogRefSpyObj = jasmine.createSpyObj({ afterClosed: of({}) });
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openModal();
    fixture.detectChanges();

    expect(dialogSpy.open).toHaveBeenCalledWith(ModalRegisterAccountComponent, {
      disableClose: true,
      width: '400px',
    });
  });

  it('should call login service and navigate to dashboard on successful login', () => {
    spyOn(authService, 'login').and.returnValue(of(true));
    const email = 'test@example.com';
    const password = 'password123';
    component.email?.setValue(email);
    component.password?.setValue(password);

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ email, password });
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should display error message on failed login', () => {
    spyOn(authService, 'login').and.returnValue(of(false));

    component.onSubmit();
    expect(snackbarService.showSnackbar).toHaveBeenCalledWith(MessageCode['LoginError'], 'error');
  });

});
