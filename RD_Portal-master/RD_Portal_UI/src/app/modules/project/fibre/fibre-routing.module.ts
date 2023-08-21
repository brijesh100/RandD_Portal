import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuardService, ProjectCreateGuardService } from '../../../service/auth-guard.service';

import { FibreSummaryComponent } from './fibre-summary/fibre-summary.component';


const routes: Routes = [
    {
        path: '',
        component: FibreSummaryComponent
      },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class FibreRoutingModule { }
  