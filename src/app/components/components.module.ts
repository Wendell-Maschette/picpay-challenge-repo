import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
