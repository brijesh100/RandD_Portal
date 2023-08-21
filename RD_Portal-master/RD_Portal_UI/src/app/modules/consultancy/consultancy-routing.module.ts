import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultancyCreateGuardService } from '../../service/auth-guard.service';
import { ConsultancyFormComponent } from './consultancy-form/consultancy-form.component';
import { ConsultancyPageComponent } from './consultancy-page/consultancy-page.component';
import { AllConsultancySummaryComponent } from './all-consultancy-summary/all-consultancy-summary.component';
const routes: Routes = [
      {
        path:'',
        component:AllConsultancySummaryComponent
      },
      {
        path: 'add',
        canActivate :[ConsultancyCreateGuardService],
        component: ConsultancyFormComponent
      },
      {
        path: ':consultancyId',
        component: ConsultancyPageComponent
      },
      {
        path: ':consultancyId/:edit',
        component: ConsultancyPageComponent
      }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ConsultancyRoutingModule { }