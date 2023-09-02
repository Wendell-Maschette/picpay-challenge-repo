import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ModalInsertTaskComponent } from './modal-insert-task/modal-insert-task.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ModalInsertTaskComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [
  ]
})
export class ComponentsModule { }
