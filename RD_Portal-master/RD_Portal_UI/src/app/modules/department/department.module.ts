import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { SharedComponentModule } from '../../shared-components/shared-component.module';

import { DepartmentPageComponent } from './department-page/department-page.component';
import { ResearchPageComponent } from './research-page/research-page.component';


@NgModule({
  declarations: [
    DepartmentPageComponent,
    ResearchPageComponent
  ],
  imports: [
    CommonModule, 
    DepartmentRoutingModule,
    SharedComponentModule
  ]
})
export class DepartmentModule {}
