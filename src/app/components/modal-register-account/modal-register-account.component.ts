import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmedValidator } from 'src/app/helpers/util-functions';
import { Account } from 'src/app/models/account.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-modal-register-account',
  templateUrl: './modal-register-account.component.html',
  styleUrls: ['./modal-register-account.component.css']
})
export class ModalRegisterAccountComponent {
  registerAccountForm: FormGroup;
  isEditMode: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private dialogRef: MatDialogRef<ModalRegisterAccountComponent>,
    private authService: AuthService,
    private fb: FormBuilder,
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
    if (!this.registerAccountForm.invalid) {
      this.authService.registerAccount(formData).subscribe(
        (res) => {
          res ? this.dialogRef.close() :
            console.log("Conta ja existe!");
        }
      );
    }
    console.log('Erro no formulário');
  }

  closeModal() {
    this.dialogRef.close();
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

}
