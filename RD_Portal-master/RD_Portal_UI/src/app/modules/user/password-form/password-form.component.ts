import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators,FormArray} from '@angular/forms';

import { RD_CONSTANT } from '../../../keys/constant'
import { GlobalStoreService } from '../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { ThemeService } from '../../../theme.service';
@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.css']
})

export class PasswordFormComponent implements OnInit {
  passwordUpdateForm = new FormGroup({
    oldPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    newPassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    confirmNewPassword: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  successMessage:string;
  errorMessage:string;
  userId:string;
  userName : string;
  departmentId:string;
  designation:string;
  userData:any;
  phonenumber:string;
  Email:string;
  darktheme:boolean;
  showcontact:boolean=false;
  userForm = new FormGroup({
    phoneNumber: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.required, Validators.minLength(3)]),
    lab:new FormControl('')
  });
  exkeywords: any;
  keywordsForm = new FormGroup({
    keyword: new FormControl()
  });
  keywords: any =[];
  editmode:boolean=false;
  researchLabs: any;
  department: any;
  lab: any;

  constructor(private service: ApiClientService, private globalStore: GlobalStoreService,private fb: FormBuilder,private router: Router,private themeService: ThemeService) { }

  
  ngOnInit(): void {
    const {userId,userDepartmentId,userName,userDesignation,userDesignationCode} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.departmentId = userDepartmentId;
    this.designation =RD_CONSTANT.USER_DESIGNATION_MAP[userDesignationCode] ;
    this.service.getUserById(this.userId).subscribe(userData=>{
      this.userData=userData;
      this.darktheme=userData.theme;
      this.Email=userData.details.email;
      this.phonenumber=userData.details.phoneNumber;
      //LAB
      this.lab=userData.details.lab;
      this.service.getDepartments().subscribe(departments => {
        if(this.departmentId!=="Admin" && this.departmentId!=="Mngmt")
        {this.researchLabs= departments.filter(dept => dept.departmentId == this.departmentId)[0].researchLab;}
      })
      if(this.Email==undefined || this.Email==''){
        this.showcontact=true;
      }
      this.userForm = this.fb.group({
        phoneNumber:[this.phonenumber],
        email:[this.Email],
        lab:[this.lab]
      });

      //EX Keywords 
      if(userData.userkeywords)
      {this.keywords=userData.userkeywords;
        this.keywordsForm = this.fb.group({
          keyword: this.fb.array(this.populateKeywords())
        });}
    })
    this.service.getProjectByUserId(this.userId).subscribe(res=>{
      let pkeys
      pkeys=res.map(res => res.keywords);
      this.service.getFundingProjectByUserId(this.userId).subscribe(fres=>{
      let fkeys
      fkeys=fres.map(fres => fres.keywords)
      this.exkeywords=pkeys.concat(fkeys)
      })
      
    })
    
  }
  
  updateUserPassword(){
    const {userId} = this.globalStore.getGlobalStore(); 
    const passwordDetail = this.passwordUpdateForm.value;
    if(passwordDetail.newPassword !== passwordDetail.confirmNewPassword){
      this.clearMessage();
      this.errorMessage = "New password and Confirm password are different";
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
  
  showContact()
  {
    this.showcontact=true;
  }
  cancel()
  {
    this.showcontact=false;
  }
  refresh()
  {
    //this.modalmessage="User Edited Successfully";
    location.reload()
   
  }
  updateuser()
  {
    let userDetails = this.userForm.value;
    console.log("update",userDetails)
    this.service.addContact(userDetails,this.userId).subscribe(response =>{
      this.userForm.reset();
      this.refresh();
      this.userForm.reset();
    },
    error=>{
    })
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };
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
    // this.router.navigateByUrl('/app-root', { skipLocationChange: true }).then(() => {
    //   this.router.navigate(['app-root']);
    // }); 
    // window.location.reload()
  }

  // addKeyword(e){
  //   console.log(e.value.keyword)
  //   this.keywords.push(e.value.keyword);
  //   this.keywordsForm.patchValue({keyword:''});
  // }

  updateKeyword(){
    const {keyword} = this.keywordsForm.value;
    this.service.adduserkeywords(keyword,this.userId).subscribe(res=>{console.log(res)})
    this.editmode=false
    this.refresh()
  }

  // deleteKeyword(index){
  //   this.keywords.splice(index,1);
  // }

  // getFormData(){
  //   if(this.keywordsForm.invalid) return null;
  //   const {keyword} = this.keywordsForm.value;
  //   return keyword;
  // }
  populateKeywords(){
    return this.keywords.map( keyword =>{
      return this.fb.control(keyword, [Validators.required,Validators.minLength(3)])
    })
  }

  get keywordArray(){
    return <FormArray>this.keywordsForm.get('keyword');
  }

  addKeyword(){
    this.keywordArray.push(this.fb.control("", [Validators.required, Validators.minLength(3)]));
  }

  deleteKeyword(index){
    this.keywordArray.removeAt(index);
  }

  getFormData(){
    if(this.keywordsForm.invalid) return null;
    const {keyword} = this.keywordsForm.value;
    return keyword;
  }
}

