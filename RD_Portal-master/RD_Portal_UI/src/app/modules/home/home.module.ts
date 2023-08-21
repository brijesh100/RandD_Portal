import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './page/home.component';
import { SharedComponentModule } from '../../shared-components/shared-component.module';
import { ChartsModule } from 'ng2-charts';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { UserDataModalComponent } from './user-data-modal/user-data-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WelcomeModalComponent } from './welcome-modal/welcome-modal.component'; 

@NgModule({
  declarations: [
    HomeComponent,
    HomeDashboardComponent,
    UserDataModalComponent,
    WelcomeModalComponent
    ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedComponentModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
