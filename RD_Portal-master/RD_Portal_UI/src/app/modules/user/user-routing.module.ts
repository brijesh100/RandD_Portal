import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OwnProfileGuardService } from '../../service/auth-guard.service';

import { PasswordFormComponent } from './password-form/password-form.component';
import { UserPageComponent } from './user-page/user-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserPageComponent,
    canActivate :[OwnProfileGuardService],
  },
  {
    path: 'update-password',
    component: PasswordFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [OwnProfileGuardService]
})

export class UserRoutingModule { }
