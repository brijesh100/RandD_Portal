import { analyzeFile } from '@angular/compiler';
import { Component, ViewChild,OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ApiClientService } from '../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../service/global-store.service';


import {hasAdminAccess}  from "../../../../utils/project.utils";
@Component({
  selector: 'app-publication-page',
  templateUrl: './publication-page.component.html',
  styleUrls: ['./publication-page.component.css']
})
export class PublicationPageComponent implements OnInit { 

  @ViewChild('titleTileRef') titleTileRef;
  @ViewChild('cardRef') cardRef;
  @ViewChild('lockcardRef') lockcardRef;
  userId:any;
  isloading: boolean;
  publicationId: any;
  publication:any;
  dept:any;
  approved:any;
  checkuser:boolean=false;
  isAdmin:boolean;
  isarchived:boolean;
  modalmessage: string;
  to: any;
  messageDetails: any;
  islocked:any;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    
    const {userDesignationCode, userName,userId} = this.globalStore.getGlobalStore();
    this.userId=userId
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = true;
      this.publicationId=params.publicationId;
      this.service.getPublicationDetailsbyId(this.publicationId).subscribe(res =>{
        this.publication=res;
        this.islocked=res.islocked;
        this.approved=res.approved;
        this.isarchived=res.isarchived;
        this.checkuser=this.usercheck()
      })
      
      
    });
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }
  onApprove()
  {
    this.service.approvePublication(this.publicationId).subscribe(res=>{
      this.to=this.publication.publisherId
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your Publication \""+this.publication.paperTitle+"\" has been Approved","type":"alert alert-success"}
      this.service.addMessage(this.messageDetails).subscribe()
    })
    this.modalmessage="Approved Successfully"
    // console.log("Approved")
    // this.router.navigate(['/admin-panel/approval/department-approval/{{dept}}']);
  }
  usercheck()
  {
    if(this.publication.coAuthor.includes(this.userId) || this.publication.publisherId.includes(this.userId) || this.isAdmin)
    {
      return true
    }
    return false
  }
  onarchive()
  {
    this.service.archivePublication(this.publicationId).subscribe(res=>{
      this.to=this.publication.publisherId
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your Publication \""+this.publication.paperTitle+"\" has been Deleted","type":"alert alert-danger"}
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Archived Successfully"
    })
  }
  onrestore()
  {
    this.service.restorePublication(this.publicationId).subscribe(res=>{
      this.to=this.publication.publisherId
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Your Publication \""+this.publication.paperTitle+"\" has been Restored","type":"alert alert-info"}
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage="Restored Successfully"
    })
  }
}
