import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInsertTaskComponent } from './modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete/modal-confirmation-delete.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalRegisterAccountComponent } from './modal-register-account/modal-register-account.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ModalInsertTaskComponent,
    ModalConfirmationDeleteComponent,
    ModalRegisterAccountComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  providers: [
  ]
})
export class ComponentsModule { }
