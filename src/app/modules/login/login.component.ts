import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/modules/login/models/account.interface';
import { ModalRegisterAccountComponent } from './components/modal-register-account/modal-register-account.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageCode, SnackbarService } from 'src/app/shared/services/snack-bar/snackbar.service';
import { ErrorsStateMatcher } from 'src/app/shared/helpers/util-functions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  makeLogin$: Subscription = new Subscription;
  private authService = inject(AuthService);
  private snackbarService = inject(SnackbarService);
  private router = inject(Router);
  dialog = inject(MatDialog);
  isSubmited: boolean = false;
  hide: boolean = true;
  
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }

  matcher = new ErrorsStateMatcher();

  onSubmit() {

    this.makeLogin$ = this.authService.login({
      email: this.email?.value,
      password: this.password?.value,
    }).subscribe({
      next: (data: boolean) => {
        if (data) {
          this.router.navigate(['/dashboard']);
        } else {
          this.snackbarService.showSnackbar(MessageCode.LoginError, 'error');
        }
      },
      error: (err: any) => {
        this.snackbarService.showSnackbar(MessageCode.Error, 'error');
      },
      complete: () => {
        this.makeLogin$.unsubscribe
      }
    });
  }

  openModal() {
    const dialogRef = this.dialog.open(ModalRegisterAccountComponent, {
      disableClose: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe();
  }
}