import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiClientService } from '../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../service/global-store.service';

import {filterUserId} from '../../../../../utils/project.utils';

@Component({
  selector: 'app-apply-funding-modal',
  templateUrl: './apply-funding-modal.component.html',
  styleUrls: ['./apply-funding-modal.component.css']
})
export class ApplyFundingModalComponent implements OnInit {
  @Input() nameOfGrant:string;   
  @Input() fundingOrganisation:string; 
  @Input() fundingId:string;  
  @Input() fundingType:string;  

  successMessage:string;
  errorMessage:string;

  userIdName:string;
  applyFundingForm: FormGroup;
  constructor( 
    private fb: FormBuilder,
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router

     ) { }

  ngOnInit(): void {
    const {userId,userName} = this.globalStore.getGlobalStore();
    this.userIdName = `${userId}-${userName}`;
    this.applyFundingForm = this.fb.group({
      project: this.fb.group({
        projectTitle: ['', [Validators.required, Validators.minLength(8)]],
        projectId: ['', [Validators.required]]
      }),
      projectSearchList : this.fb.array([])
    });
  }
  
  get projectSearchList(){
    return <FormArray>this.applyFundingForm.get('projectSearchList');
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
    const {project} = this.applyFundingForm.value;
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
    this.applyFundingForm.controls['project'].setValue(selectedProject);
    this.clearProjectSearchList();
  }

 clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }

  applyFunding(){
    let appliedFP = this.applyFundingForm.value;
    let fundingProjectDetails ={
      nameOfGrant : this.nameOfGrant,
      fundingOrganisation : this.fundingOrganisation,
      investigator : filterUserId([this.userIdName])[0],
      project:appliedFP.project,
      isExternal:false,
      fundingType: this.fundingType,
      appliedFundingId: this.fundingId,
      applicationChecks:{filled:false,hod:false,proposal:false,technical:false,principal:false}
    };
    
    this.service.addRecievedFundingProject(fundingProjectDetails).subscribe( response =>{
      this.clearMessage();
      this.applyFundingForm.reset();
      this.router.navigate([`/funding/applied/${response.fundingProjectId}/edit`]);
      this.applyFundingForm.patchValue({investigator:this.userIdName});
    },error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }
}
