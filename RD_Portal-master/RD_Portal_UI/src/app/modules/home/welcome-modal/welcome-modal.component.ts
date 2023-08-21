import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators,FormArray} from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';
import { GlobalStoreService } from 'src/app/service/global-store.service';
import { ThemeService } from '../../../theme.service';
@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css'],
})
export class WelcomeModalComponent implements OnInit {
  @Input() darktheme:any;
  @Input() userDetails:any;

  userForm:FormGroup;
  submitted = false;
  isSonatechmail = true;
  userId:any;
  contentNo:Number=1;

  passwordUpdateForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  passwordSubmitted = false;
  passwordMismatch:Boolean = false;
  successMessage:string;
  errorMessage:string;
  isLoading:boolean = false;
  @ViewChild('closebutton') closebutton;
  @ViewChild('tickmodalbutton') tickmodalbutton;

  constructor(
    private service: ApiClientService,
    private formBuilder: FormBuilder,
    private globalStore: GlobalStoreService,
    private themeService: ThemeService
  ) { }

  get f() { return this.userForm.controls; }
    
  get pf() { return this.passwordUpdateForm.controls; }

  ngOnInit(): void {
    this.userId = localStorage.getItem('USERID');
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phoneNumber: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  //User details update
  detailSubmit() {
    const {userId} = this.globalStore.getGlobalStore();
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    // Check if email is sonatechId
    if(!((this.userForm.value.email).includes('sonatech'))){
      this.isSonatechmail = false;
      return;
    }
    // Add user data API Call
    this.service.addContact(this.userForm.value,userId).subscribe(res=>{
      if(res){
        this.changeContent(3);
      }
    });
  }
  //theme change
  change(values)
  {
    this.darktheme=values.currentTarget.checked;
    console.log(values.currentTarget.checked);
    this.globalStore.settheme(values.currentTarget.checked)
    if(this.darktheme){
    this.service.enabledark(this.userId).subscribe();
    this.themeService.toggleDark()
    }
    else{
      this.service.disabledark(this.userId).subscribe();
      this.themeService.toggleLight()
    }
    window.location.reload();
  }
  // Password Update
  updateUserPassword(){
    const {userId} = this.globalStore.getGlobalStore(); 
    this.passwordSubmitted = true;
    if (this.passwordUpdateForm.invalid) {
      console.log(this.pf);
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
        this.changeContent(4);
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


  
  changeContent(value){
    this.contentNo=value;
    if(value==4){
      this.isLoading=true;
      setTimeout(()=>{
        this.isLoading=false;
        this.closebutton.nativeElement.click();
        this.contentNo=5;
        setTimeout(()=>{
          this.tickmodalbutton.nativeElement.click();
        },500);
        
      },2000)
    }
  }

}
