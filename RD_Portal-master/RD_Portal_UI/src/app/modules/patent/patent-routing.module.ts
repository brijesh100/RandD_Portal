import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService, AdminGuardService } from '../../service/auth-guard.service';

import { PatentFormComponent } from './patent-form/patent-form.component';
import { AllPatentsComponent } from './all-patents/all-patents.component';
import { PatentPageComponent } from './patent-page/patent-page.component';
import { PatentEditComponent } from './patent-edit/patent-edit.component';
const routes: Routes = [
  {
    path: '',
    component: AllPatentsComponent
  },
  {
    path: 'create-patent',
    canActivate: [AdminGuardService],
    component: PatentFormComponent
  },
  {
    path: 'add-patent',
    canActivate: [AdminGuardService],
    component: PatentFormComponent
  },
  {
    path: ':patentId',
    component: PatentPageComponent
  },
  {
    path: ':patentId/:edit',
    component: PatentEditComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatentRoutingModule { }
