import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
  ]
})
export class ComponentsModule { }
