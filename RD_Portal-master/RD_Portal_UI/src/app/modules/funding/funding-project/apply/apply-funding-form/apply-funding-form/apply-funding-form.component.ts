import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import { ApiClientService } from '../../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../../service/global-store.service';

import {filterUserId,hasAdminAccess} from '../../../../../../utils/project.utils';
import { RD_CONSTANT } from '../../../../../../keys/constant';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-apply-funding-form',
  templateUrl: './apply-funding-form.component.html',
  styleUrls: ['./apply-funding-form.component.css']
})
export class ApplyFundingFormComponent implements OnInit {

  appliedFundingForm: FormGroup;
  userIdName:any;
  fundingTypeList: any;
  otherTypeName: string;
  successMessage:string;
  errorMessage:string;
  isAdmin: boolean;
  projectkeys:any;
  department:any;
  fundingType:any;
  fundother:boolean=false;
  needPro:boolean=false;
  needConf:boolean=false;
  is_seed:Boolean=false;
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

    this.appliedFundingForm = this.fb.group({
      nameOfGrant: ['', [Validators.required, Validators.minLength(5)]],
      fundingOrganisation: ['', [Validators.required, Validators.minLength(5)]],
      fundingType: ['', [Validators.required]],
      investigator: [this.userIdName, [Validators.required]],
      coInvestigator: [''],
      investigatorSearchList : this.fb.array([]),
      coinvestigatorSearchList : this.fb.array([]),
      newinvestigator:[""],
      newcoinvestigator:[""],
      project: this.fb.group({
        projectTitle: ['', [Validators.required]],
        projectId: ['', [Validators.required]],
        projectKeyword:[['']],
        department:[['']],
      }),
      otherFundingType: [''],
      projectSearchList : this.fb.array([]),
      keywords:[['']],
      seedmoney:['',Validators.required]
    });
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }

  get projectSearchList(){
    return <FormArray>this.appliedFundingForm.get('projectSearchList');
  }
  get investigatorSearchList(){
    return <FormArray>this.appliedFundingForm.get('investigatorSearchList');
  }
  get coinvestigatorSearchList(){
    return <FormArray>this.appliedFundingForm.get('coinvestigatorSearchList');
  }
  // get newlyAddedContributors(){
  //   return <FormArray>this.appliedFundingForm.get('newlyAddedContributors');
  // }

  clearinvestigatorSearchList(){
    while ( this.investigatorSearchList.length !== 0) {
      this.investigatorSearchList.removeAt(0)
    }
  }
  clearcoinvestigatorSearchList(){
    while ( this.coinvestigatorSearchList.length !== 0) {
      this.coinvestigatorSearchList.removeAt(0)
    }
  }

  setinvestigatorList(userIds){
    userIds.forEach( id =>{
        this.investigatorSearchList.push(this.fb.control(id))
    });
  }
  setcoinvestigatorList(userIds){
    userIds.forEach( id =>{
        this.coinvestigatorSearchList.push(this.fb.control(id))
    });
  }
  addcoinvestigator(index){
    let newContributor = this.coinvestigatorSearchList.value[index];
    this.appliedFundingForm.controls['coInvestigator'].setValue(newContributor);
    this.appliedFundingForm.get("newcoinvestigator").reset();
    this.clearcoinvestigatorSearchList();
  }
  addinvestigator(index){
    let newContributor = this.investigatorSearchList.value[index];
    this.appliedFundingForm.controls['investigator'].setValue(newContributor);
    this.appliedFundingForm.get("newinvestigator").reset();
    this.clearinvestigatorSearchList();
  }
  getMatchinginvestigatorIds(searchId){
    const newContributor=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    this.clearinvestigatorSearchList();
    if( newContributor.length > 1){
      this.service.getMatchingUserId(newContributor)
        .subscribe( userIds => { this.setinvestigatorList(userIds) });
    }
  }
  getMatchingcoinvestigatorsIds(searchId){
    const newContributor=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    this.clearcoinvestigatorSearchList();
    if( newContributor.length > 1){
      this.service.getMatchingUserId(newContributor)
        .subscribe( userIds => { this.setcoinvestigatorList(userIds) });
    }
  }
  setProjectList(projectList){
    this.clearProjectSearchList();
    projectList.forEach( project =>{
        this.projectSearchList.push(this.fb.group({
          projectTitle:[project.projectTitle],
          projectId:[project.projectId],
          projectKeyword:[project.keywords],
          department:[project.projectDepartment]
        }));
    });
  }

  searchUserProject(){
    this.clearProjectSearchList();
    const {project} = this.appliedFundingForm.value;
    if(project.projectTitle.length > 0){
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
    this.appliedFundingForm.controls['project'].setValue(selectedProject);
    this.clearProjectSearchList();
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }

  change(e)
  {
    this.fundingType=e
    if(e=='Research Project grant'){
      this.needPro=true
    }
    if(e!="Research Project grant"){
      this.fundother=false
      this.needPro=false
      
    }
    if(e=='Conference/Workshop grant'){
      this.needConf=true;
    }
    if(e=='Others'){
      this.fundother=true;
      this.needPro=false
    }
  }
  
  addAppliedFunding(){
    let fundingDetails = this.appliedFundingForm.value;
    let fundingType = fundingDetails.fundingType;
    if(fundingType === 'Others'){
      fundingType = fundingDetails.otherFundingType?fundingDetails.otherFundingType:'Others';
    }
    if(fundingDetails.seedmoney=='true'){
      this.is_seed=true;
    }
      let fundingProjectDetails ={
        nameOfGrant : fundingDetails.nameOfGrant,
        fundingOrganisation : fundingDetails.fundingOrganisation,
        investigator: (fundingDetails.investigator),
        coInvestigator:fundingDetails.coInvestigator,
        project:fundingDetails.project,
        isExternal:true,
        status:'04',
        fundingType,
        Department:this.department,
        ProjectKeywords:this.projectkeys,
        isUserApplied:true,
        seedmoney:this.is_seed
      };
      fundingProjectDetails.ProjectKeywords=this.projectkeys;
      this.service.addRecievedFundingProject(fundingProjectDetails).subscribe( response =>{
        this.clearMessage();
        this.appliedFundingForm.reset();
        this.router.navigate([`/funding/apply/${response.fundingProjectId}/edit`]);
        this.appliedFundingForm.patchValue({investigator:this.userIdName});
      },error=>{
        this.clearMessage();
        this.errorMessage = error;
      })
  }

}