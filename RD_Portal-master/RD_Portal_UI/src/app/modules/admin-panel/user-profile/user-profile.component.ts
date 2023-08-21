import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';
import { FormBuilder,FormGroup, FormControl,Validators} from '@angular/forms';
import { RD_CONSTANT } from '../../../keys/constant'
import {getDepartmentName, getDesignationName,getgroupName} from '../../../utils/project.utils';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  projects:any;
  publications:any;
  fundingProjects:any;
  user:any;
  userId:any;
  userName : string;
  departmentId:string;
  designation:any;
  createAccess:boolean;
  receivedfundings:any;
  departments: any;
  notificatation: string;
  rejectedfundings: any;
  modalmessage: string;
  needDepartment:boolean;
  editMode:boolean;
  //add details field not to overwrite
  phone:any;
  email:any;
  
  successMessage:string;
  errorMessage:string;
  userForm = new FormGroup({
    userId: new FormControl('',[Validators.required, Validators.minLength(5)]),
    userName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userDesignationCode: new FormControl('',[Validators.required]),
    userGroup: new FormControl('',[Validators.required]),
    userDepartmentId: new FormControl('',[Validators.required]),
    lab: new FormControl('')
  });
  isarchived: any;
  group: any;
  details: any;
  MessageForm: FormGroup; 
  researchLabs: any;
  UserDetail:any;
  constructor(private activatedRoute: ActivatedRoute,private service:ApiClientService,private fb: FormBuilder,private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe(params =>{
      this.userId=params.userId;
      this.service.getUserById(this.userId).subscribe(user=>this.user=user)
    })
    this.MessageForm = this.fb.group({
      Message : ["", [Validators.required, Validators.minLength(4)]]
    });
    this.service.getProjectByUserId(this.userId).subscribe(projects =>{
      let allProjects = projects.map(
          project => ({"projectId" : project.projectId, 
                      "projectTitle" :project.projectTitle,
                      "status" : RD_CONSTANT.PROJECT_STATUS_MAP[project.status],
                      "createdAt": project.createdAt,
                      "review":project.review,
                      "approved":project.approved
                    })
      );
      this.projects = allProjects;
    })

    this.service.getPublicationsByUserId(this.userId).subscribe(publications =>{
      let allPublications = publications.map(
        publication => ({"publicationId" : publication.publicationId, 
                      "publicationType" :publication.publicationType,
                      "publicationName" :publication.publicationName,
                      "paperTitle": publication.paperTitle,
                      "yearOfPublication": publication.yearOfPublication
                    })
      );
      this.publications = allPublications;
    })
    
    this.service.getFundingProjectByUserId(this.userId).subscribe(fundingProjects =>{
      let allFundingProjects = fundingProjects.map(
        fundingProject => ({"fundingProjectId" : fundingProject.fundingProjectId, 
                      "fundingType" :fundingProject.fundingType,
                      "status" :  RD_CONSTANT.FUNDING_STATUS_MAP[fundingProject.status],
                      "nameOfGrant": fundingProject.nameOfGrant,
                      "isExternal": fundingProject.isExternal,
                      "fundingOrganisation":fundingProject.fundingOrganisation,
                      "fundingamount":fundingProject.fundingAmount
                     
                    })
        );
      this.receivedfundings=allFundingProjects.filter(projects => projects.status==='Accepted')
      this.fundingProjects = allFundingProjects.filter(projects => projects.status!=='Accepted' && projects.status!=='Rejected');
      this.rejectedfundings=allFundingProjects.filter(projects => projects.status==='Rejected')
      //this.fundingProjects.push(this.rejectedfundings)
    })
    this.designation = RD_CONSTANT.DESIGNATION;
    this.group= RD_CONSTANT.SDESIGNATION;
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
    });
    this.showUserOverview(this.userId);
    
  }
  get Message(){
    return this.MessageForm.get('Message');
  }
  archive()
  {
    this.service.archiveUser(this.userId).subscribe(res=>{
      this.modalmessage="User Archived Successfully"
    })
  }
  restore()
  {
    this.service.restoreUser(this.userId).subscribe(res=>{
      this.modalmessage="User Restored Successfully"
    })
  }
  onedit()
  {
    this.editMode=true;
  }
  cancel()
  {
    this.editMode=false;
  }
  showUserOverview(userId){
    if(RD_CONSTANT.ROLE_WITH_NO_DEPARTMENT.includes(this.userForm.value.userDesignationCode)){
      this.needDepartment = false;
      this.userForm.patchValue({userDepartmentId:'NILL'});
  }else{
      this.needDepartment = true;
      this.userForm.patchValue({userDepartmentId:''});
  }
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;this.userForm = this.fb.group({
        userId:[this.user.userId],
        userName: [this.user.userName],
        userDesignationCode:[this.user.userDesignationCode],
        userGroup:[this.user.userGroup],
        userDepartmentId:[this.user.userDepartmentId],
        lab:[this.user.details.lab]
      });
      this.phone=userdata.details.phoneNumber;
      this.email=userdata.details.email;
      this.isarchived=userdata.isarchived;
      //LAB
      this.service.getDepartments().subscribe(departments => {
        this.researchLabs= departments.filter(dept => dept.departmentId == userdata.userDepartmentId)[0].researchLab;
      })
      
    })
    
  }
  setDepartment(){
    if(RD_CONSTANT.ROLE_WITH_NO_DEPARTMENT.includes(this.userForm.value.userDesignationCode)){
        this.needDepartment = false;
        this.userForm.patchValue({userDepartmentId:'NILL'});
    }else{
        this.needDepartment = true;
        this.userForm.patchValue({userDepartmentId:''});
    }
    console.log("inside Dep",this.needDepartment)
  }
  refresh()
  {
    //this.modalmessage="User Edited Successfully";
    location.reload()
   
  }
  edituser()
  {
    let userDetails = this.userForm.value;
    this.UserDetail=this.userForm.value;
    let det={'phoneNumber':this.phone,'email':this.email,'lab':this.userForm.value.lab};
    this.UserDetail.details=det
    userDetails.userDesignation = getDesignationName(userDetails.userDesignationCode);
    userDetails.userGroupname=getgroupName(userDetails.userGroup);
    if(userDetails.userDepartmentId !== 'NILL')
      userDetails.userDepartment = getDepartmentName(userDetails.userDepartmentId, this.departments);

    this.service.editUser(userDetails,userDetails.userId).subscribe(response =>{
      this.userForm.reset();
      this.refresh();
      this.userForm.reset();
    },
    error=>{
    })
  }
  resetpass()
  {
    let userDetails = this.userForm.value;
    userDetails.userPassword = 'Welcome123';
    userDetails.userDesignation = getDesignationName(userDetails.userDesignationCode);
    userDetails.userGroupname=getgroupName(userDetails.userGroup);
    if(userDetails.userDepartmentId !== 'NILL')
      userDetails.userDepartment = getDepartmentName(userDetails.userDepartmentId, this.departments);

    this.service.editUser(userDetails,userDetails.userId).subscribe(response =>{
      this.userForm.reset();
      this.refresh();
      this.clearMessage();
      this.successMessage = response.message;
      this.userForm.reset();
      this.modalmessage="Password has been reset to Welcome123"
    },
    error=>{
      this.errorMessage = error.errorMessage;
    })
  }
  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };
  sendText(){
    const {userId} = this.globalStore.getGlobalStore();
    this.details={}
    this.details.from=userId;
    this.details.to=this.userId;
    this.details.payload=this.Message.value+"<br>-"+userId;
    this.details.type="alert alert-info"
    // console.log(this.details);
    this.service.addMessage(this.details).subscribe(res=>{
      console.log(res)
    })
    //console.log(this.Message.value)
  }
}

