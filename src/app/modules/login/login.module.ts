import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ModalRegisterAccountComponent } from './components';

@NgModule({
  declarations: [LoginComponent, ModalRegisterAccountComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class LoginModule {}
