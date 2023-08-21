import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {RD_CONSTANT} from '../../../../../../keys/constant';

import { ApiClientService } from '../../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../../service/global-store.service';

import {getFundingProjectEditAccess}  from "../../../../../../utils/funding.utils";
import {filterUserId,hasAdminAccess} from "../../../../../../utils/project.utils";
import {validateAndUpdate}  from "../../../../../../utils/project.utils";
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apply-fp-details',
  templateUrl: './apply-fp-details.component.html',
  styleUrls: ['./apply-fp-details.component.css']
})
export class ApplyFpDetailsComponent implements OnInit {

  @ViewChild('summaryTileRef') summaryTileRef;
  @ViewChild('keywordsTileRef') keywordsTileRef;
  @ViewChild('amountTileRef') amountTileRef;
  @ViewChild('datesTileRef') datesTileRef;
  @ViewChild('investigatorCardRef') investigatorCardRef;
  
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
  dept:any;
  summary:String;
  keywords:any;
  Applied:boolean;
  fundingAmount:any;
  fundDates:any
  fundingprojectId:any;
  investigator:String;
  coInvestigator:any;

  history:any;
  status:any;
  applicationChecks:any;
  isAdmin: boolean;
  approved:boolean;
  remark:any;
  documents:any;
  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.RECEIVED_FP_TILE_INDEX.TOTAL_SIZE).fill(false); 
  addremark: FormGroup;
  to: any;
  messageDetails: any;
  modalmessage: string;
  isarchived: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private globalStore: GlobalStoreService,
    private router:Router,
    

  ) { }

  ngOnInit(): void {
    this.Applied=true;
    const { userId,userDesignationCode } = this.globalStore.getGlobalStore();
    this.userId = userId;

    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getfundingProjectById(params.fundingProjectId).subscribe(fundingProject => {
        console.log(fundingProject)
          this.setViewContent(fundingProject);
          this.canEdit = getFundingProjectEditAccess(this.globalStore.getGlobalStore(), filterUserId([fundingProject.investigator]));
          this.editMode = this.canEdit && (params.edit === 'edit');
          this.setNavigation(this.editMode);
          this.approved=fundingProject.approved;
          this.isloading = false;
          this.fundingprojectId=fundingProject.fundingProjectId;
          this.remark=fundingProject.Remarks;
          this.project = fundingProject.project;
          this.documents=fundingProject.documents;
        },
        error=>{
          this.router.navigate(['/funding']);
        })
      })
      this.isAdmin = hasAdminAccess(userDesignationCode);
  }

  setViewContent(fundingProject){
    console.log(fundingProject)
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
    this.isarchived=fundingProject.isarchived;

   }

  setNavigation(edit){
    if(edit)
    this.router.navigate([`/funding/apply/${this.fundingProject.fundingProjectId}/edit`]);
    else
    this.router.navigate([`/funding/apply/${this.fundingProject.fundingProjectId}`]);
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

    console.log(this.investigatorCardRef.getFormData())

    const history = {commitMessage, userId:this.userId};
    const {investigator, coInvestigator} = this.investigatorCardRef.getFormData();
    // coInvestigator.push(this.coInvestigator)
    let updatedReceivedFP = {
      nameOfGrant:this.nameOfGrant,
      fundingOrganisation:this.fundingOrganisation,
      fundingType:this.fundingType,
      project:this.project,

      coInvestigator: coInvestigator, 

      summary: validateAndUpdate(this.summaryTileRef.getFormData(), this.summary ),
      keywords: validateAndUpdate(this.keywordsTileRef.getFormData(), this.keywords ),

      fundingAmount: validateAndUpdate(this.amountTileRef.getFormData(), this.fundingAmount ),
      fundDates: validateAndUpdate(this.datesTileRef.getFormData(), this.fundDates ),

      investigator: filterUserId([validateAndUpdate(investigator, this.investigator )])[0], 
      
      
      isExternal: this.isExternal,
      status:this.status,
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
  Approve()
  {
    this.service.approveFunding(this.fundingProject.fundingProjectId).subscribe(res=>{
        //Send Notification
        this.to=this.investigator
        this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your Funding \""+this.fundingProject.nameOfGrant+"\" has been approved","type":"alert alert-success"}
        this.service.addMessage(this.messageDetails).subscribe()
    })
    window.history.go(-1);
    
  }
  onarchive()
  {
    this.service.archiveFundingProject(this.fundingProject.fundingProjectId).subscribe(res=>{
      //Send Notification
      // this.to=filterUserId(this.investigator)
      // this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your project \""+this.nameOfGrant+"\" has been Archived","type":"alert alert-danger"}
      // this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Archived Successfully"
    })
  }
  onrestore()
  {
    this.service.restoreFundingProject(this.fundingProject.fundingProjectId).subscribe(res=>{
      //Send Notification
      // this.to=filterUserId(this.investigator)
      // this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your project \""+this.nameOfGrant+"\" has been Restored","type":"alert alert-info"}
      // this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Restored Successfully"
    })
  }
  refresh()
  {
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getfundingProjectById(params.fundingProjectId).subscribe(fundingProject => {
          this.setViewContent(fundingProject);
          this.canEdit = getFundingProjectEditAccess(this.globalStore.getGlobalStore(), filterUserId([fundingProject.investigator]));
          this.editMode = this.canEdit && (params.edit === 'edit');
          this.setNavigation(this.editMode);
          this.approved=fundingProject.approved;
          this.isloading = false;
          this.fundingprojectId=fundingProject.fundingProjectId;
          this.remark=fundingProject.Remarks;
        },
        error=>{
          this.router.navigate(['/funding']);
        })
      })
  }
  statusp(event){
    this.status=event.value
  }
}