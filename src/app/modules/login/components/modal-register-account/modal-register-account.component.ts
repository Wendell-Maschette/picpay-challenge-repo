import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmedValidator } from 'src/app/shared/helpers/util-functions';
import { Account } from 'src/app/modules/login/models/account.interface';
import { AuthService } from 'src/app/modules/login/services/auth/auth.service';
import { MessageCode, SnackbarService } from 'src/app/shared/services/snack-bar/snackbar.service';

@Component({
  selector: 'app-modal-register-account',
  templateUrl: './modal-register-account.component.html',
  styleUrls: ['./modal-register-account.component.scss']
})
export class ModalRegisterAccountComponent {
  registerAccountForm: FormGroup;
  isEditMode: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ModalRegisterAccountComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Account
  ) {
    this.registerAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    })
  }

  get email() {
    return this.registerAccountForm.get('email');
  }

  get password() {
    return this.registerAccountForm.get('password');
  }

  get confirmPassword() {
    return this.registerAccountForm.get('confirmPassword');
  }

  registerAccount() {
    const formData: Account = this.registerAccountForm.value;

    if (this.registerAccountForm.invalid) {
      this.snackbarService.showSnackbar(MessageCode.Error, 'error');
      return;
    }

    this.authService.registerAccount(formData).subscribe({
      next: (res: boolean | Observable<Account>) => {
        if (typeof res === 'boolean') {
          if (res) {
            this.dialogRef.close();
            this.snackbarService.showSnackbar(MessageCode.RegisterAccountSuccess, 'success');
          } else {
            this.snackbarService.showSnackbar(MessageCode.RegisterAccountError, 'error');
          }
        }
      },
      error: (err: any) => {
        this.snackbarService.showSnackbar(MessageCode.Error, 'error');
      },
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
