import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { ResearchLabFormComponent } from './research-lab-form/research-lab-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { FundingFormComponent } from './funding-form/funding-form.component';

import { SharedComponentModule } from '../../shared-components/shared-component.module';
import { ApprovalComponent } from './approval/approval.component';
import { DepartmentApprovalComponent } from './department-approval/department-approval.component';
import { UserListCardComponent } from './user-list-card/user-list-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PublicationModalComponent } from './department-approval/publication-modal/publication-modal.component';

@NgModule({
  declarations: [
    DepartmentFormComponent, ResearchLabFormComponent, UserFormComponent, FundingFormComponent, ApprovalComponent,
    DepartmentApprovalComponent,
    UserListCardComponent,
    UserListComponent,
    UserProfileComponent,
    PublicationModalComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    ReactiveFormsModule,
    SharedComponentModule,
    
  ]
})
export class AdminPanelModule { }
