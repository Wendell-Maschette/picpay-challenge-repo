import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalInsertTaskComponent } from './modal-insert-task/modal-insert-task.component';
import { ModalConfirmationDeleteComponent } from './modal-confirmation-delete/modal-confirmation-delete.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ModalRegisterAccountComponent } from './modal-register-account/modal-register-account.component';
import { PaginationComponent } from './pagination/pagination.component';

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
