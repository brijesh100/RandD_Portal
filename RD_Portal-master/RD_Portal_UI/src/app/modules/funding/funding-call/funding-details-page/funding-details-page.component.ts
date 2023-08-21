import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import {RD_CONSTANT} from '../../../../keys/constant';

import { ApiClientService } from '../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../service/global-store.service';

import {getFundingEditAccess, isPastDate}  from "../../../../utils/funding.utils";
import {validateAndUpdate}  from "../../../../utils/project.utils";

@Component({
  selector: 'app-funding-details-page',
  templateUrl: './funding-details-page.component.html',
  styleUrls: ['./funding-details-page.component.css']
})
export class FundingDetailsPageComponent implements OnInit {
  @ViewChild('descriptionTileRef') descriptionTileRef;
  @ViewChild('additionalDetailsTileRef') additionalDetailsTileRef;
  @ViewChild('headerSectionTileRef') headerSectionTileRef;
  @ViewChild('fundingUrlsCardRef') fundingUrlsCardRef;
  @ViewChild('keywordTileRef') keywordTileRef;
  
  userId:string;

  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;
  isloading:boolean;
  
  funding:any
  nameOfGrant:String;
  fundingOrganisation:String;
  deadline:Date;
  descriptionOfScheme:String;
  additionalDetails:any;
  fundingUrls:any;
  status:String;
  badge:String
  keywords:any;
  ukeys:any;
  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.FUNDING_TILE_INDEX.TOTAL_SIZE).fill(false); 
  messageDetails: { from: string; to: any; payload: string; type: string; };
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private router:Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const { userId } = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.editMode = false;
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getfundingDetailsById(params.fundingId).subscribe(funding => {
          this.setViewContent(funding);
          this.canEdit = getFundingEditAccess(this.globalStore.getGlobalStore());
          this.editMode = this.canEdit && (params.edit === 'edit');
          this.setNavigation(this.editMode);
          this.isloading = false;
        },
        error=>{
          this.router.navigate(['/funding']);
        })
      })
    }
    
  setViewContent(funding){
    this.funding = funding;
    this.descriptionOfScheme = funding.descriptionOfScheme;
    this.additionalDetails = funding.additionalDetails;
    this.nameOfGrant= funding.nameOfGrant;
    this.fundingOrganisation= funding.fundingOrganisation;
    this.deadline = funding.deadline;
    this.fundingUrls = funding.fundingUrls;
    this.keywords=funding.keyword;
    this.status = isPastDate(this.deadline)? "Closed":"Live";
    this.badge = isPastDate(this.deadline)? "danger":"success";
   }
   setNavigation(edit){
      if(edit)
      this.router.navigate([`/funding/${this.funding.fundingId}/edit`]);
      else
      this.router.navigate([`/funding/${this.funding.fundingId}`]);
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
    const header = this.headerSectionTileRef.getFormData();
    this.ukeys=this.keywordTileRef.getFormData();
    let updatedFunding = {
      nameOfGrant:validateAndUpdate(header.nameOfGrant, this.nameOfGrant ),
      fundingOrganisation:validateAndUpdate(header.fundingOrganisation, this.fundingOrganisation ),
      deadline: validateAndUpdate(header.deadline, this.deadline ),
      descriptionOfScheme: validateAndUpdate(this.descriptionTileRef.getFormData(), this.descriptionOfScheme ),
      additionalDetails: validateAndUpdate(this.additionalDetailsTileRef.getFormData(), this.additionalDetails ), 
      keyword: this.keywordTileRef.getFormData(),
      fundingUrls:validateAndUpdate(this.fundingUrlsCardRef.getFormData(), this.fundingUrls ),
      history
    };

    this.service.updateFunding(updatedFunding, this.funding.fundingId )
    .subscribe( updatedFunding =>{
      this.clearMessages();
      this.setViewContent(updatedFunding.response);
      this.successMessage = updatedFunding.message;
      this.editMode = false;
      this.setNavigation(this.editMode);
      },error =>{
        this.clearMessages();
       this.errorMessage = error;
    })
    this.sendMessage(this.ukeys)
  }
  sendMessage(keys)
  {
    this.service.keywordusers(keys).subscribe(res=>{

      let to= res.map(res => res.userId);
      this.messageDetails={"from":this.userId,"to":to,"payload":"Funding matching your intrested keywords added! Please check","type":"alert alert-info"}
      this.service.addMessage(this.messageDetails).subscribe()
    })
  }

}
