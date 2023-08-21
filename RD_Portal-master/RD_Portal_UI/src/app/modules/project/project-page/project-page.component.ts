import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute,Router,NavigationEnd} from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

import { RD_CONSTANT } from './../../../keys/constant';

import {getEditAccess,validateAndUpdate,filterUserId,hasAdminAccess}  from "../../../utils/project.utils";
import { UrlService } from 'src/app/utils/url.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnChanges {

  @ViewChild('titleTileRef') titleTileRef;
  @ViewChild('priorityProjectTileRef') priorityProjectTileRef;
  @ViewChild('summaryTileRef') summaryTileRef;
  @ViewChild('keywordsTileRef') keywordsTileRef;
  @ViewChild('referenceLinkTileRef') referenceLinkTileRef;
  @ViewChild('contentTileRef') contentTileRef;
  @ViewChild('statusCardRef') statusCardRef;
  @ViewChild('contributorsCardRef') contributorsCardRef;
  @ViewChild('visibilityCardRef') visibilityCardRef;
  @ViewChild('lockCardRef') lockCardRef;
  @ViewChild('file-tile') filetileRef;
  @ViewChild('projectDepartment') projectDepartment;

  userId:string;
  
  isAdmin:boolean;

  canEdit:boolean;
  editMode:boolean;
  successMessage:string;
  errorMessage:string;
  isloading: boolean;
  
  project:any;
  fundingProjects:any;

  documents:any;
  projectTitle: string;
  projectContent: any = [];
  projectSummary: string;
  referenceLink: any = [];
  keywords:any = [];
  status: string;
  contributors:any = [];
  history:any;
  visibility:any;
  projectid:any;
  approved:any;
  Review:any;
  remarks:any;
  dept:any;

  oldslength:any;
  olddlength:any;
  oldkeylength:any;
  oldrlength:any;
  ohistoryl:any;
  newslength:any;
  newdlength:any;
  newkeylength:any;
  newrlength:any;

  endDate:any;
  summaryedited:boolean;
  keywordedited:boolean;
  detailedited:boolean;
  islocked:boolean;
  isAnyformInvalid:boolean = false;
  formValidityArray = Array(RD_CONSTANT.PROJECT_TILE_INDEX.TOTAL_SIZE).fill(false); 
  referencesedited: boolean;
  isarchived: any;

  modalmessage:any;
  messageDetails: {};
  to: any;
  showdetails:boolean=false;
  showButtonName:String="Show more";
  showicon:String ="fa fa-caret-down";

  isPriority:Boolean=false;
  priorityProjectDetails:any;

  publications:any;

  previousUrl: string;
  previousUrlArray:any;
  breadcrumbNames: any;
  breadcrumbItems:any=[];
  constructor( 
    private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService,
    private urlService: UrlService) { }

  ngOnInit(): void {
    const {userDesignationCode, userName,userId} = this.globalStore.getGlobalStore();
    this.editMode = false;
    this.userId = userId;

    // Get previous route for breadcrumb
    this.urlService.previousUrl$.subscribe((previousUrl : string) => {
      this.previousUrlArray = previousUrl.split('/');
      this.previousUrlArray = this.previousUrlArray.slice(1);
      // Appending to form proper link to breadcrumb for backward route
      if(this.previousUrlArray.length>1){
        for(let i=1;i<(this.previousUrlArray.length);i++){
          this.previousUrlArray[i] = this.previousUrlArray[i-1] + '/' + this.previousUrlArray[i]
        }
      }
      // Breadcrumb names defined in constants for static links
      this.breadcrumbNames = RD_CONSTANT.breadcrumbNames;
      console.log(this.previousUrlArray)
      let flag = true;
      let flag2=false;
      for(let i=0;i<this.previousUrlArray.length;i++){
        // If static link check in breadcrumb names
        if(this.breadcrumbNames.hasOwnProperty(this.previousUrlArray[i])){
          flag2=true;
          this.breadcrumbItems.push({'url':this.previousUrlArray[i],'name':this.breadcrumbNames[this.previousUrlArray[i]]});
        }
        // If not static check if department or admin  panel route
        else{
          if(this.previousUrlArray[i]=='department' || this.previousUrlArray[i]=='admin-panel/department-approval'){continue;}
          // check if it is admin panel link or department wise link
          if(this.previousUrlArray[i].startsWith('admin-panel/department-approval') || this.previousUrlArray[i].startsWith('department/')){
            this.breadcrumbItems.push({'url':this.previousUrlArray[i],'name':this.previousUrlArray[i].slice(this.previousUrlArray[i].lastIndexOf('/')+1)});
          }
          else{
            flag = false;
            continue;
          }
        }
      }
      // all other default case gets prject breadcrumb
      if(flag==false && flag2==false){
        this.breadcrumbItems.push({'url':'/project','name':'Projects'});
      }
    });
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getProjectById(params.projectId).subscribe(project => {
        this.oldslength=project.projectSummary;
        this.oldkeylength=project.keywords;
        this.ohistoryl=project.history.length;
        this.olddlength=project.projectContent;
        this.oldrlength=project.referenceLink;
        this.summaryedited=project.edited.summaryedit;
        this.keywordedited=project.edited.keywordedit;
        this.detailedited=project.edited.detailedit;
        this.referencesedited=project.edited.refedit;
        this.publications=project.publication;
        this.setViewContent(project);
        this.projectid=params.projectId
        this.canEdit = getEditAccess(this.globalStore.getGlobalStore(), project);
        this.editMode = this.canEdit && (params.edit === 'edit');
        this.setNavigation(this.editMode);
        this.isloading = false;
      },error=>{
        this.router.navigate(['/project']);
      });

      this.service.getFundingsByProjectId(params.projectId).subscribe( fundingProjects =>{
        this.fundingProjects = fundingProjects;
      });
    })
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }

  ngOnChanges(){
  
  }
  setViewContent(project){
    this.project = project;
    this.history = project.history;
    this.projectTitle = project.projectTitle;
    this.projectSummary = project.projectSummary;
    this.keywords = project.keywords;
    this.referenceLink = project.referenceLink;
    this.projectContent = project.projectContent;
    this.endDate=project.end;
    if(this.project.status==""){
      if(this.endDate=="")
      {
        this.status="01";
      }
      else if(this.endDate!="")
      {
        this.status="02";
      }
    }
    else{
      this.status = project.status;
    }
    
    this.contributors = project.team;
    this.visibility=project.visibility;
    this.islocked=project.islocked;
    this.approved=project.approved;
    this.isarchived=project.isarchived;
    this.Review=project.review;
    this.documents=project.documents;
    this.remarks=project.remarks;
    this.dept=project.projectDepartment;
    this.priorityProjectDetails=project.priority;
    this.isPriority=project.isPriority;
  }

  setNavigation(edit){
     if(edit) 
      this.router.navigate([`/project/${this.project.projectId}/edit`]);
     else 
      this.router.navigate([`/project/${this.project.projectId}`]);
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

  onApprove()
  {
    this.service.approveProject(this.projectid).subscribe(res=>{
      // //Send Notification
      // this.to=filterUserId(this.contributors)
      // this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your project \""+this.projectTitle+"\" has been Approved","type":"alert alert-success"}
      // console.log(this.messageDetails)
      // this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Approved Successfully"
    })
    
    //this.router.navigate(['/admin-panel/approval/department-approval/{{dept}}']);
  }

  refresh()
  {
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.service.getProjectById(params.projectId).subscribe(project => {
        
        this.setViewContent(project);
        this.projectid=params.projectId
        this.canEdit = getEditAccess(this.globalStore.getGlobalStore(), project);
        this.editMode = this.canEdit && (params.edit === 'edit');
        this.setNavigation(this.editMode);
        this.isloading = false;
      },error=>{
        this.router.navigate(['/project']);
      });
    })
  }

  onreview()
  {
    this.service.reviewProject(this.projectid).subscribe(res=>{
      //Send Notification
      this.to=filterUserId(this.contributors)
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Please Review \""+this.projectTitle+"\"","type":"alert alert-warning"}
      this.service.addMessage(this.messageDetails).subscribe()
    })
    this.modalmessage="Project Sent for Review!"
    //this.router.navigate(['/project']);
  }

  updateProjectWithCommit({commitMessage}){
    const history = {commitMessage, userId:this.userId};
    const contributors = validateAndUpdate(this.contributorsCardRef.getFormData(), this.contributors );
    
    this.keywordedited=false;
        this.summaryedited=false;
        
        this.newslength=this.summaryTileRef.getFormData();
        this.newkeylength=this.keywordsTileRef.getFormData();
        this.newdlength=this.contentTileRef.getFormData();
        this.newrlength=this.referenceLinkTileRef.getFormData();
        if(this.oldslength.length!=this.newslength.length)
        {
          this.summaryedited=true;
        }
        if(this.oldkeylength.length!=this.newkeylength.length && this.ohistoryl>1)
        {
          this.keywordedited=true;
        }
        if(this.olddlength.length!=this.newdlength.length && this.ohistoryl>1)
        {
          this.detailedited=true;
        }
        if(this.oldrlength.length!=this.newrlength.length && this.ohistoryl>1)
        {
          this.referencesedited=true;
        }
        
        const edited={summaryedit:this.summaryedited,keywordedit:this.keywordedited,detailedit:this.detailedited,refedit:this.referencesedited}
        if(this.statusCardRef.getFormData()=="01")
        {
          this.endDate=""
        }
        else if(this.statusCardRef.getFormData()=="02")
        {
          this.endDate=new Date();
        }
    let updatedProject = {
      approved:false,
      projectTitle: validateAndUpdate(this.titleTileRef.getFormData(), this.projectTitle ),
      projectSummary:  validateAndUpdate(this.summaryTileRef.getFormData(), this.projectSummary ) ,
      keywords:validateAndUpdate(this.keywordsTileRef.getFormData(), this.keywords),
      referenceLink:validateAndUpdate(this.referenceLinkTileRef.getFormData(), this.referenceLink),
      projectContent: validateAndUpdate(this.contentTileRef.getFormData(), this.projectContent ),
      status: validateAndUpdate(this.statusCardRef.getFormData(), this.status ),
      team: filterUserId(contributors),
      end:this.endDate,
      visibility: this.visibilityCardRef.getFormData(),
      history,
      edited,
      projectDepartment: this.projectDepartment.getFormData(),
      priority: this.project.priority,
    };
    if(this.project.isPriority){
      updatedProject.priority=validateAndUpdate(this.priorityProjectTileRef.getFormData(), this.priorityProjectDetails ) ;
    }
    this.service.updateProject(updatedProject,this.project.projectId )
      .subscribe( updatedProject =>{
        this.clearMessages();
        this.setViewContent(updatedProject.response);
        this.successMessage = updatedProject.message;
        this.editMode = false;
        this.setNavigation(this.editMode);
      },error =>{
        this.clearMessages();
       this.errorMessage = error;
    })
  }
  onarchive()
  {
    this.service.archiveProject(this.projectid).subscribe(res=>{
      //Send Notification
      this.to=filterUserId(this.contributors)
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your project \""+this.projectTitle+"\" has been Deleted","type":"alert alert-danger"}
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Archived Successfully"
    })
  }
  onrestore()
  {
    this.service.restoreProject(this.projectid).subscribe(res=>{
      //Send Notification
      this.to=filterUserId(this.contributors)
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your project \""+this.projectTitle+"\" has been Restored","type":"alert alert-info"}
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Restored Successfully"
    })
  }
  onpatent()
  {
    if(this.canEdit)
    {
    this.router.navigate([`/patent/add-patent/${this.project.projectId}`]);
    }
  }
  showtoggle()
  {
    this.showdetails=!this.showdetails;
    if(this.showdetails)
    {
      this.showButtonName="Show less";
      this.showicon ="fa fa-caret-right";
    }
    else{
      this.showButtonName="Show more";
      this.showicon ="fa fa-caret-down";
    }
  }
}
