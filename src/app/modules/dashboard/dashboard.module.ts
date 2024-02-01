import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import {
  FiltersComponent,
  ModalConfirmationDeleteComponent,
  ModalInsertTaskComponent,
  PaginationComponent,
  TableComponent,
} from './components';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HomeComponent } from './pages';

@NgModule({
  declarations: [
    DashboardComponent,
    ModalInsertTaskComponent,
    ModalConfirmationDeleteComponent,
    PaginationComponent,
    FiltersComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    DashboardRoutingModule,
    
  ],
})
export class DashboardModule {}
