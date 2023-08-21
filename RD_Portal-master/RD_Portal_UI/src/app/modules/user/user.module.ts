import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { SharedComponentModule } from './../../shared-components/shared-component.module';

import { UserPageComponent } from './user-page/user-page.component';
import { PasswordFormComponent } from './password-form/password-form.component';
import { UserDataComponent } from './user-data/user-data.component';


@NgModule({
  declarations: [UserPageComponent, PasswordFormComponent, UserDataComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedComponentModule
  ]
})
export class UserModule { }
