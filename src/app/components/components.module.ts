import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ModalCreateTaskComponent } from './modal-create-task/modal-create-task.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    ModalCreateTaskComponent,
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
