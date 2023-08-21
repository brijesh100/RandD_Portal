import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form/user-form.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ResearchLabFormComponent } from './research-lab-form/research-lab-form.component';
import { FundingFormComponent } from './funding-form/funding-form.component';
import { ApprovalComponent } from './approval/approval.component';
import { DepartmentApprovalComponent } from './department-approval/department-approval.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const routes: Routes = [
  {
    path:'',
    component:ApprovalComponent
  },
  {
    path: 'department',
    component:DepartmentFormComponent
  },
  {
    path: 'research-lab',
    component:ResearchLabFormComponent
  },
  {
    path: 'user',
    component:UserFormComponent
  },
  {
    path: 'funding',
    component:FundingFormComponent
  },
  {
    path:'approval',
    component:ApprovalComponent
  },
  {
    path:'department-approval/:departmentId',
    component:DepartmentApprovalComponent
  },
  {
    path:'user-list/:deptId',
    component:UserListComponent
  },
  {
    path:'user-profile/:userId',
    component:UserProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
