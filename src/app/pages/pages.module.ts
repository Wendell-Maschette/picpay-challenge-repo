import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { MaterialModule } from '../material.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    ComponentsModule
  ]
})
export class PagesModule { }
