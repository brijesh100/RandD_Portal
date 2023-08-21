import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { ApiClientService } from "../../../service/api-client.service";
import { GlobalStoreService } from './../../../service/global-store.service';
import { ThemeService } from './../../../theme.service';
import { hasAdminAccess } from 'src/app/utils/project.utils';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  loginForm = new FormGroup({
    userId: new FormControl('',[Validators.required]),
    userPassword: new FormControl('',[Validators.required])
  });
  archived:boolean;
  errorMessage:string = "";
  Forgotpass: FormGroup;
  Newpass:FormGroup;
  otp: any;
  OTP_V:any;
  otpVerified:Boolean=false;
  USERID:any;
  oldpass:any;
  changed:Boolean=false;
  showotp:boolean=false;
  passwords: {};
  modalErrorMessage: any;
  constructor(private service: ApiClientService,
    private router: Router,
    private globalStore: GlobalStoreService,
    private themeService: ThemeService,
    private fb: FormBuilder
    ) { }

    ngOnInit(): void {
      this.themeService.toggleLight
      this.Forgotpass = this.fb.group({
        userid : ["", [Validators.required, Validators.minLength(8)]]
      });
      this.Newpass = this.fb.group({
        Npass : ["", [Validators.required, Validators.minLength(5)]],
        CNpass:["", [Validators.required, Validators.minLength(5)]],
      });
    }
    sendsms(){
      let user=this.Forgotpass.get('userid');
      console.log(user.value);
      this.USERID=user.value;
      this.service.forgotPassword(user.value).subscribe(res=>{
        console.log(res)
        this.OTP_V=res
        this.showotp=true;
      },(err)=>{
        this.modalErrorMessage=err;
      })
    }
    onOtpChange(otp) {
      this.otp = otp;
    }
    checkOTP(){
      let uotp=this.otp;
      this.service.checkOTP(this.USERID,{"otp":uotp}).subscribe(res=>{
        console.log(res);
        if(res.isValid){
          this.otpVerified=true;
          console.log(this.otpVerified)
          document.getElementById("CPButton").click();
        }
        if(this.otpVerified){
          this.service.setDefaultPass(this.USERID).subscribe();
        }
        else{
          this.errorMessage = 'Invalid OTP';
  
        }
      },(err)=>{
        this.errorMessage=err;
      });
    }
    change(){
      let newpass=this.Newpass.get('Npass').value
      let cnewpass=this.Newpass.get('CNpass').value
      if(newpass==cnewpass){
        this.passwords={oldPassword:'Welcome123',newPassword:newpass}
        this.service.FupdatePassword(this.passwords,this.USERID).subscribe(res=>{
          if(res){
            this.changed=true;
            this.errorMessage="";
          }
        })
      }
    }
  clearModalMessage(){
    this.modalErrorMessage = '';
  }
  authenticateUser(){
    this.service.loginUser(this.loginForm.value).subscribe(response =>{
      if(response.user.isarchived)
      {
        this.archived=true;
      }
      else{
        localStorage.setItem('TOKEN',response.token);
        this.archived=false;
        this.globalStore.setGlobalStore(response.user);
        this.router.navigate(['home']);
        // if(hasAdminAccess(response.user.userDesignationCode)){
        //   this.router.navigate(['home']);
        // }
        // else if(response.user.details==undefined || response.user.details.email==''){
        //   this.router.navigate(['user/update-password']);
        // }
        // else{
        //   this.router.navigate(['home']);
        // }
        if (response.user.theme) {
          this.themeService.toggleDark();
        } 
        else{
          this.themeService.toggleLight();
        }
      }
    },
    error => {
      this.errorMessage = error;
    })
  }
}
