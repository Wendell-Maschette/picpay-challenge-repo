import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInsertTaskComponent } from './modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete/modal-confirmation-delete.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalRegisterAccountComponent } from './modal-register-account/modal-register-account.component';
import { HomeComponent } from '../pages/home/home.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    ModalInsertTaskComponent,
    ModalConfirmationDeleteComponent,
    ModalRegisterAccountComponent,
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
  ],
  exports: [ 
    ModalInsertTaskComponent,
    ModalConfirmationDeleteComponent,
    ModalRegisterAccountComponent,
    PaginationComponent
  ]

})
export class ComponentsModule { }
