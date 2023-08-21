import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {RD_CONSTANT} from '../../../../../keys/constant';

import { ApiClientService } from '../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../service/global-store.service';

import {getAppliedFundingProjectEditAccess}  from "../../../../../utils/funding.utils";
import {filterUserId} from "../../../../../utils/project.utils";
import {validateAndUpdate}  from "../../../../../utils/project.utils";

@Component({
  selector: 'app-applied-fp-details-page',
  templateUrl: './applied-fp-details-page.component.html',
  styleUrls: ['./applied-fp-details-page.component.css']
})
export class AppliedFpDetailsPageComponent implements OnInit {
  @ViewChild('summaryTileRef') summaryTileRef;
  @ViewChild('keywordsTileRef') keywordsTileRef;
  @ViewChild('checkTileRef') checkTileRef;
  @ViewChild('amountTileRef') amountTileRef;
  @ViewChild('datesTileRef') datesTileRef;
  @ViewChild('investigatorCardRef') investigatorCardRef;
  @ViewChild('statusCardRef') statusCardRef;
  userId: string;

  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;
  isloading:boolean;

  fundingProject:any;
  isExternal:boolean;

  nameOfGrant:String;
  fundingOrganisation:String;
  fundingType:String;
  project:any;
  
  summary:String;
  keywords:any;
  
  fundingAmount:any;
  fundDates:any
  
  investigator:String;
  coInvestigator:any;

  history:any;
  status:any;
  applicationChecks:any;
  documents:any;

  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.RECEIVED_FP_TILE_INDEX.TOTAL_SIZE).fill(false); 


  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private globalStore: GlobalStoreService,
    private router:Router
  ) { }
  ngOnInit(): void {
    const { userId } = this.globalStore.getGlobalStore();
    this.userId = userId;

    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getfundingProjectById(params.fundingProjectId).subscribe(fundingProject => {
          this.setViewContent(fundingProject);
          this.canEdit = getAppliedFundingProjectEditAccess(this.globalStore.getGlobalStore(), filterUserId([fundingProject.investigator]));
          this.editMode = this.canEdit && (params.edit === 'edit');
          this.setNavigation(this.editMode);
          this.isloading = false;
        },
        error=>{
          this.router.navigate(['/funding']);
        })
      })
  }

  setViewContent(fundingProject){
    this.fundingProject = fundingProject;
    this.isExternal = fundingProject.isExternal;

    this.nameOfGrant= fundingProject.nameOfGrant;
    this.fundingOrganisation= fundingProject.fundingOrganisation;
    this.fundingType = fundingProject.fundingType;
    this.project = fundingProject.project;

    this.summary = fundingProject.summary;
    this.keywords = fundingProject.keywords;

    this.investigator = fundingProject.investigator;
    this.coInvestigator = fundingProject.coInvestigator;

    this.fundingAmount = fundingProject.fundingAmount;
    this.fundDates = fundingProject.fundDates;

    this.history = fundingProject.history;
    this.status = fundingProject.status;
    this.documents = fundingProject.documents;
    this.applicationChecks = fundingProject.applicationChecks;

   }

   setNavigation(edit){
    if(edit)
    this.router.navigate([`/funding/applied/${this.fundingProject.fundingProjectId}/edit`]);
    else
    this.router.navigate([`/funding/applied/${this.fundingProject.fundingProjectId}`]);
  }

  onEditMode(){
    this.editMode = true;
    this.setNavigation(this.editMode);
  }

  cancelUpdate(){
    this.editMode = false;
    this.setNavigation(this.editMode);
  }

  clearMessages(){
    this.errorMessage = "";
    this.successMessage = "";
  }

  checkAllFormValidity(event){
    this.formValidityArray[event.index] = event.value;
    this.isAnyformInvalid = this.formValidityArray.includes(true);
  }
  
  updateWithCommit({commitMessage}){

    const history = {commitMessage, userId:this.userId};
    const {investigator, coInvestigator} = this.investigatorCardRef.getFormData();
    const principalCheckStatus = this.checkTileRef.getFormData()?.status;
    const actualstatus = this.statusCardRef.getFormData();
    if(principalCheckStatus){
      this.status = actualstatus > principalCheckStatus?actualstatus:principalCheckStatus;
    }
    else{
      this.status = actualstatus;
    }
    let updatedReceivedFP = {
      nameOfGrant:this.nameOfGrant,
      fundingOrganisation:this.fundingOrganisation,
      fundingType:this.fundingType,
      project:this.project,
      summary: validateAndUpdate(this.summaryTileRef.getFormData(), this.summary ),
      keywords: validateAndUpdate(this.keywordsTileRef.getFormData(), this.keywords ),

      fundingAmount: validateAndUpdate(this.amountTileRef.getFormData(), this.fundingAmount ),
      fundDates: validateAndUpdate(this.datesTileRef.getFormData(), this.fundDates ),

      investigator: filterUserId([validateAndUpdate(investigator, this.investigator )])[0], 
      coInvestigator: filterUserId(validateAndUpdate(coInvestigator, this.coInvestigator)), 
      
      applicationChecks : validateAndUpdate(this.checkTileRef.getFormData()?.applicationChecks, this.applicationChecks ),
      isExternal: this.isExternal,
      status: this.status,
      history
    };

    this.service.updateReceivedFundingProject(updatedReceivedFP, this.fundingProject.fundingProjectId )
    .subscribe( updatedReceivedFP =>{
      this.clearMessages();
      this.setViewContent(updatedReceivedFP.response);
      this.editMode = false;
      this.setNavigation(this.editMode);
      this.successMessage = updatedReceivedFP.message;
      },error =>{
        this.clearMessages();
       this.errorMessage = error;
    })
  }

}
