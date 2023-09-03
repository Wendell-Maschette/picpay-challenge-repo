import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInsertTaskComponent } from './modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete/modal-confirmation-delete.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ModalInsertTaskComponent,
    ModalConfirmationDeleteComponent,
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
