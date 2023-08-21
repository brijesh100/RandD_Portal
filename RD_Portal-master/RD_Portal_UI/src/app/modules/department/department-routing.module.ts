import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepartmentPageComponent } from './department-page/department-page.component';
import { ResearchPageComponent } from './research-page/research-page.component';

const routes: Routes = [
  {
    path: ':departmentId',
    component: DepartmentPageComponent
  },
  {
    path: ':departmentId/:researchId',
    component: ResearchPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
