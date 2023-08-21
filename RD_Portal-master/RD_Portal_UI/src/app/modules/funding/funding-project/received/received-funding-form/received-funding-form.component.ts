import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import { ApiClientService } from '../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../service/global-store.service';

import {filterUserId,hasAdminAccess} from '../../../../../utils/project.utils';
import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-received-funding-form',
  templateUrl: './received-funding-form.component.html',
  styleUrls: ['./received-funding-form.component.css']
})

export class ReceivedFundingFormComponent implements OnInit {
  receivedFundingForm: FormGroup;
  userIdName:any;
  fundingTypeList: any;
  otherTypeName: string;
  successMessage:string;
  errorMessage:string;
  isAdmin: boolean;

  department:any;

  constructor(
    private fb: FormBuilder,
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router
    ) { }

  ngOnInit(): void {
    const {userId,userName,userDesignationCode,userDepartmentId} = this.globalStore.getGlobalStore();
    this.userIdName = `${userId}-${userName}`;
    this.department=userDepartmentId
    this.fundingTypeList = RD_CONSTANT.FUNDING_TYPE;

    this.receivedFundingForm = this.fb.group({
      nameOfGrant: ['', [Validators.required, Validators.minLength(5)]],
      fundingOrganisation: ['', [Validators.required, Validators.minLength(5)]],
      fundingType: ['', [Validators.required]],
      investigator: [this.userIdName, [Validators.required]],
      project: this.fb.group({
        projectTitle: ['', [Validators.required, Validators.minLength(8)]],
        projectId: ['', [Validators.required]]
      }),
      otherFundingType: [''],
      projectSearchList : this.fb.array([]),
    });
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }

  get projectSearchList(){
    return <FormArray>this.receivedFundingForm.get('projectSearchList');
  }

  setProjectList(projectList){
    this.clearProjectSearchList();
    projectList.forEach( project =>{
        this.projectSearchList.push(this.fb.group({
          projectTitle:[project.projectTitle],
          projectId:[project.projectId]
        }));
    });
  }

  searchUserProject(){
    this.clearProjectSearchList();
    const {project} = this.receivedFundingForm.value;
    if(project.projectTitle.length > 3){
      this.service.getMatchingProject(project.projectTitle)
        .subscribe(projectList=>{ this.setProjectList(projectList) });
    } 
  }

  clearProjectSearchList(){
    while ( this.projectSearchList.length !== 0) {
      this.projectSearchList.removeAt(0);
    }
  }

  setProject(index){
    let selectedProject = this.projectSearchList.value[index];
    this.receivedFundingForm.controls['project'].setValue(selectedProject);
    this.clearProjectSearchList();
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }
  
  addReceivedFunding(){
    let fundingDetails = this.receivedFundingForm.value;
    let fundingType = fundingDetails.fundingType;
    if(fundingType === 'Others'){
      fundingType = fundingDetails.otherFundingType?fundingDetails.otherFundingType:'Others';
    }

    let fundingProjectDetails ={
      nameOfGrant : fundingDetails.nameOfGrant,
      fundingOrganisation : fundingDetails.fundingOrganisation,
      investigator: filterUserId([fundingDetails.investigator])[0],
      project:fundingDetails.project,
      isExternal:true,
      status:'08',
      fundingType,
      Department:this.department
    };

    this.service.addRecievedFundingProject(fundingProjectDetails).subscribe( response =>{
      this.clearMessage();
      this.receivedFundingForm.reset();
      this.router.navigate([`/funding/received/${response.fundingProjectId}/edit`]);
      this.receivedFundingForm.patchValue({investigator:this.userIdName});
    },error=>{
      this.clearMessage();
      this.errorMessage = error;
    })

  }

}
