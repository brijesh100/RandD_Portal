import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundingCreateGuardService } from '../../service/auth-guard.service';

import { AllFundingSummaryComponent } from './funding-call/all-funding-summary/all-funding-summary.component';
import { FundingDetailsPageComponent} from './funding-call/funding-details-page/funding-details-page.component'

import { ReceivedFundingFormComponent } from './funding-project/received/received-funding-form/received-funding-form.component';
import { ReceivedFpDetailsPageComponent } from './funding-project/received/received-fp-details-page/received-fp-details-page.component';
import {AppliedFpDetailsPageComponent} from './funding-project/applied/applied-fp-details-page/applied-fp-details-page.component';
import { ApplyFundingFormComponent } from './funding-project/apply/apply-funding-form/apply-funding-form/apply-funding-form.component';
import { ApplyFpDetailsComponent } from './funding-project/apply/apply-funding-details/apply-fp-details/apply-fp-details.component';
import { FundingFormComponent } from './funding-grant/funding-form/funding-form.component';
const routes: Routes = [
  {
    path: '',
    component: AllFundingSummaryComponent
  },
  {
    path: 'applied/:fundingProjectId',
    component: AppliedFpDetailsPageComponent
  },
  {
    path: 'usergrant',
    component: FundingFormComponent
  },
  {
    path: 'applied/:fundingProjectId/:edit',
    component: AppliedFpDetailsPageComponent
  },
  {
    path: 'received',
    canActivate :[FundingCreateGuardService],
    component: ReceivedFundingFormComponent
  },
  {
    path: 'apply',
    canActivate :[FundingCreateGuardService],
    component: ApplyFundingFormComponent
  },
  {
    path: 'apply/:fundingProjectId',
    component: ApplyFpDetailsComponent
  },
  {
    path: 'apply/:fundingProjectId/:edit',
    component: ApplyFpDetailsComponent
  },
  {
    path: 'received/:fundingProjectId',
    component: ReceivedFpDetailsPageComponent
  },
  {
    path: 'received/:fundingProjectId/:edit',
    component: ReceivedFpDetailsPageComponent
  },
  {
    path: ':fundingId',
    component: FundingDetailsPageComponent
  },
  {
    path: ':fundingId/:edit',
    component: FundingDetailsPageComponent
  },
  {
    path: 'applyfunding',
    component: ReceivedFundingFormComponent
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FundingRoutingModule { }
