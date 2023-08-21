import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


import {AdminGuardService } from '../../../service/auth-guard.service';

import { FibreRoutingModule } from './fibre-routing.module';

import { FibreSummaryComponent } from './fibre-summary/fibre-summary.component';

@NgModule({
  declarations: [
    FibreSummaryComponent
  ],
  imports: [
    CommonModule,
    FibreRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class FibreModule { }
