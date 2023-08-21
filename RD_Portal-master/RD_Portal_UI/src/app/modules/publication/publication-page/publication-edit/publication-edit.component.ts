import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { GlobalStoreService } from '../../../../service/global-store.service';
import { ApiClientService } from '../../../../service/api-client.service';
import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../../utils/project.utils';
import{ RD_CONSTANT} from '../../../../keys/constant';

import {hasAdminAccess}  from "../../../../utils/project.utils";
import { UpperCasePipe } from '@angular/common';
@Component({
  selector: 'app-publication-edit',
  templateUrl: './publication-edit.component.html',
  styleUrls: ['./publication-edit.component.css']
})
export class PublicationEditComponent implements OnInit {
  isAdmin:any;
  usererror:any;
  publicationForm: FormGroup;
  userId:any;
  successMessage:string;
  errorMessage:string;
  userIdName:string;
  ptypes:any;
  type:any='';
  isloading: boolean;
  publicationId: any;
  publication:any;
  team:any=[];
  checkuser:boolean;
  upfile:File;
  filledDocument: any;
  contributorIds:any = [];
  userDepartment:any;
  other_cos:any=[];

  constructor(private fb: FormBuilder, private globalStore :GlobalStoreService, private service:ApiClientService
    ,private activatedRoute: ActivatedRoute,
    private router:Router, ) { }

  ngOnInit(): void {
    this.type=''
    const {userDesignationCode, userName,userId} = this.globalStore.getGlobalStore();
    
    this.isAdmin = hasAdminAccess(userDesignationCode);
    this.userId=userId
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.publicationId=params.publicationId;
      this.service.getPublicationDetailsbyId(this.publicationId).subscribe(res =>{
        this.publication=res
        this.team=this.publication.coAuthor
        this.userDepartment=this.publication.Department
        this.checkuser=this.usercheck()
        if(this.checkuser)
        {this.changeform(this.publication.publicationType)}
        this.other_cos=this.publication.extraCoAuthor;
      })
    });
    
    this.userIdName = `${userId}-${userName}`;
    //this.changeform(this.publication)
    this.publicationForm = this.fb.group({
      publicationType: ['', Validators.required], 
      publicationName: [''], 
        paperTitle: [''],
        publisherId: [''],
        volumeNumber: [''],
        ISSN:[''],
        pagesFrom:[''],
        pagesTo:[''],
        indexing:[''],
        ISBN:[''],
        yearOfPublication:[''],
        contributionAs:[''],
        issueNumber:[''],
        impactFactor:[''],
        editionNumber:[''],
        DOIorURL:[''],
        file:[{filledApplication:'',acknowledgement:''}],
        searchedContributorId:[''],
        reach:[''],
      Department:[''],
      abstract:['']
    });
    this.ptypes={type:["Journal","Conference proceedings","Arvix","Book","Book Chapter","Magazine","Newspaper","Blog"]};
  }

  changeform(e){
    this.type=e
    if(e=='Arvix'){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        publisherId: [this.publication.publisherId, Validators.required],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        contributionAs:[this.publication.contributionAs, Validators.required],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchedContributorId],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach],
        Department:this.userDepartment,
        abstract:['']
      });
    }
    else if(e=='Journal' || e=='Conference Proceedings' ){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        publisherId: [this.publication.publisherId, Validators.required],
        volumeNumber: [this.publication.volumeNumber],
        ISSN:[this.publication.ISSN],
        pagesFrom:[this.publication.pagesFrom],
        pagesTo:[this.publication.pagesTo],
        indexing:[this.publication.indexing, Validators.required],
        ISBN:[this.publication.ISBN],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        contributionAs:[this.publication.contributionAs, Validators.required],
        issueNumber:[this.publication.issueNumber],
        impactFactor:[this.publication.impactFactor],
        editionNumber:[this.publication.editionNumber],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchedContributorId],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach, Validators.required],
        Department:this.userDepartment,
        abstract:['']
      });
    }
    else if(e=='Book'){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        publisherId: [this.publication.publisherId, Validators.required],
        volumeNumber: [this.publication.volumeNumber],
        ISSN:[this.publication.ISSN],
        pagesFrom:[this.publication.pagesFrom],
        pagesTo:[this.publication.pagesTo],
        indexing:[this.publication.indexing, Validators.required],
        ISBN:[this.publication.ISBN],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        contributionAs:[this.publication.contributionAs, Validators.required],
        issueNumber:[this.publication.issueNumber],
        impactFactor:[this.publication.impactFactor],
        editionNumber:[this.publication.editionNumber],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchedContributorId],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach, Validators.required],
        Department:this.userDepartment,
        abstract:['']
      });
    }
    else if( e=='Book Chapter'){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        publisherId: [this.publication.publisherId, Validators.required],
        volumeNumber: [this.publication.volumeNumber],
        ISSN:[this.publication.ISSN],
        pagesFrom:[this.publication.pagesFrom],
        pagesTo:[this.publication.pagesTo],
        indexing:[this.publication.indexing, Validators.required],
        ISBN:[this.publication.ISBN],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        contributionAs:[this.publication.contributionAs, Validators.required],
        issueNumber:[this.publication.issueNumber],
        impactFactor:[this.publication.impactFactor],
        editionNumber:[this.publication.editionNumber],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchedContributorId],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach, Validators.required],
        Department:this.userDepartment,
        abstract:['']
      });
    }
    else if(e=='Magazine' || e=='Newspaper'){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        pagesFrom:[this.publication.pagesFrom],
        pagesTo:[this.publication.pagesTo],
        ISBN:[this.publication.ISBN],
        ISSN:[this.publication.ISSN],
        publisherId: [this.publication.publisherId, Validators.required],
        issueNumber:[this.publication.issueNumber],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        contributionAs:[this.publication.contributionAs, Validators.required],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchedContributorId],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach, Validators.required],
        Department:this.userDepartment,
        abstract:['']
      });
    }
    else if(e=='Blog'){
      this.publicationForm = this.fb.group({
        publicationType:e,
        publicationName: [this.publication.publicationName, Validators.required], 
        paperTitle: [this.publication.paperTitle, Validators.required],
        publisherId: [this.publication.publisherId, Validators.required],
        yearOfPublication:[this.publication.yearOfPublication.substring(0,10), Validators.required],
        DOIorURL:[this.publication.DOIorURL, Validators.required],
        file:[this.publication.file],
        searchedContributorId:[this.publication.searchContributorIds],
        otherContributorId:[this.publication.othersContributorId],
        reach:[this.publication.reach, Validators.required],
        Department:this.userDepartment,
        abstract:['']
      });
    }
  }

  handleFileInput(files: FileList) {
    this.upfile= files.item(0);
    //this.publicationForm.value.file = files.item(0);
  }
  
  clearMessage(){
    this.successMessage = "";
    this.errorMessage = "";
    this.usererror="";
  }

  searchContributorIds(searchId){
    searchId=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if( this.contributorIds.length === 0 || searchId !== this.contributorIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.contributorIds = userIds;
      })
    } 
  }

  addContributorToTeam(contributorId){
    this.service.getUserById(contributorId.split('-')[0]).subscribe(res=>{
      if(res)
      {
      if(!this.team.includes(contributorId) && 
      contributorId != "" && 
      this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT)
      {
        this.team.push(contributorId);
        this.publicationForm.patchValue({searchedContributorId:""});
      }   
      
    }
    },error => {
      this.usererror = error;
    });
     
  }
  addotherco(coauthid)
  {
    console.log(coauthid)
    this.other_cos.push(coauthid);
  }
  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.publication.publisherId));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  updatePublication(){
    const publicationDetails =  this.publicationForm.value;
    publicationDetails.coAuthor = filterUserId(this.team);
    publicationDetails.extraCoAuthor = this.other_cos;
    this.service.updatePublication(this.publicationId,publicationDetails).subscribe( response=>{
      this.clearMessage();
      this.successMessage = response.message;
      this.publicationForm.reset();
      this.publicationForm.patchValue({publisherId:this.publication.publisherId});
      this.router.navigate([`/publication/${this.publicationId}`]);
    }, error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }
  selectApplication(event){
    if(event.target.files.length > 0){
      this.filledDocument = event.target.files[0];
    }
  }
  usercheck()
  {
    if(this.publication.coAuthor.includes(this.userId) || this.publication.publisherId.includes(this.userId) || this.isAdmin)
    {
      return true
    }
    return false
  }
  uploadApplication(){
    const formData = new FormData();
  
    formData.append('file', this.filledDocument);
    this.service.uploadPublicationFile(formData, this.publicationId).subscribe(res=>{
    });
  }
  cancel()
  {
    window.history.go(-1);
  }
  removecoauth(memberId)
  {
    this.other_cos = this.other_cos.filter(people => (people != memberId || people == this.publication.publisherId));
  }

}
