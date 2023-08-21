import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators,FormArray} from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';
import { GlobalStoreService } from 'src/app/service/global-store.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  passwordUpdateForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  submitted = false;
  passwordMismatch:Boolean = false;
  successMessage:string;
  errorMessage:string;
  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  get f() { return this.passwordUpdateForm.controls; }
  updateUserPassword(){
    const {userId} = this.globalStore.getGlobalStore(); 
    this.submitted = true;
    if (this.passwordUpdateForm.invalid) {
      return;
    }
    const passwordDetail = this.passwordUpdateForm.value;
    if(passwordDetail.newPassword !== passwordDetail.confirmNewPassword){
      this.passwordMismatch = true;
      this.clearMessage();
      this.errorMessage = "Password did not match";
    }
    else{
      let {confirmNewPassword, ...passwords} = passwordDetail;
      this.service.updatePassword(passwords, userId).subscribe(response =>{
        this.clearMessage();
        this.successMessage = response.message;
        this.passwordUpdateForm.reset();
      },
      error=>{
        this.clearMessage();
        this.errorMessage = error;
      })
    }
  };
  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };
  closeModal(){
    this.passwordUpdateForm.reset();
    this.passwordMismatch = false;
    this.clearMessage();
  }
}
