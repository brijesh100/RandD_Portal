import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminGuardService, ProjectCreateGuardService } from '../../service/auth-guard.service';
import { PriorityProjectFormComponent } from './priority-project-form/priority-project-form.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { AllProjectSummaryComponent } from './all-project-summary/all-project-summary.component';
import { KeywordSearchComponent } from './keyword-search/keyword-search.component';
import { PriorityProjectListComponent } from './priority-project-list/priority-project-list.component';

const routes: Routes = [
  {
    path: '',
    component: AllProjectSummaryComponent
  },
  {
    path: 'keyword/:key',
    component:KeywordSearchComponent
  },
  {
    path: 'add',
    canActivate :[ProjectCreateGuardService],
    component: ProjectFormComponent
  },
  {
    path: 'addPriority',
    canActivate :[AdminGuardService],
    component: PriorityProjectFormComponent
  },
  {
    path: 'showPriority',
    canActivate :[AdminGuardService],
    component: PriorityProjectListComponent
  },
  {
    path: ':projectId',
    component: ProjectPageComponent
  },
  {
    path: ':projectId/:edit',
    component: ProjectPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
