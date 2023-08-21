import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationCreateGuardService } from '../../service/auth-guard.service';

import { PublicationFormComponent } from './publication-form/publication-form.component';
import { AllPublicationSummaryComponent } from './all-publication-summary/all-publication-summary.component';
import { PublicationPageComponent } from './publication-page/publication-page/publication-page.component';

import { PublicationEditComponent } from './publication-page/publication-edit/publication-edit.component';
const routes: Routes = [
  {
    path: '',
    component: AllPublicationSummaryComponent
  },
  {
    path: 'add',
    canActivate :[PublicationCreateGuardService],
    component: PublicationFormComponent
  },
  {
    path: ':publicationId',
    component: PublicationPageComponent
  },
  {
    path:':publicationId/:edit',
    component: PublicationEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicationRoutingModule { }
