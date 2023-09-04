import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Account } from 'src/app/models/account.interface';
import { ModalRegisterAccountComponent } from '../modal-register-account/modal-register-account.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageCode, SnackbarService } from 'src/app/services/snackbar.service';
import { ErrorsStateMatcher } from 'src/app/helpers/util-functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private snackbarService: SnackbarService,
    private router: Router,
    public dialog: MatDialog
  ) {}
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
    const bodyLogin: Account = {
      email: this.email?.value,
      password: this.password?.value,
    };
    this.authService.login(bodyLogin).subscribe({
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