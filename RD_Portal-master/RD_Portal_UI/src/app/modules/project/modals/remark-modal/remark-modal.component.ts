import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiClientService } from './../../../../service/api-client.service';
import { ActivatedRoute,Router } from '@angular/router';

import {getEditAccess,validateAndUpdate,filterUserId,hasAdminAccess, getTodayDate}  from "../../../../utils/project.utils";

@Component({
  selector: 'app-remark-modal',
  templateUrl: './remark-modal.component.html',
  styleUrls: ['./remark-modal.component.css']
})
export class RemarkModalComponent implements OnChanges {
  @Input() isAdmin:boolean;
  @Input() projectid:string;
  @Input() contributors:any;
  @Input() projectTitle : any;
  @Input() userId:any;
  @Input() dept:string;
  @Output() confirmReviewEmitter = new EventEmitter<any>();
  confirmReviewForm: FormGroup;
  sr:String;
  kr:String;
  dr:string;
  rr:String;
  messageDetails: any;
  to: any;
  constructor(private service: ApiClientService,private fb: FormBuilder,private router:Router,private activatedRoute: ActivatedRoute) {
    
    this.confirmReviewForm = this.fb.group({
      summaryRemarks: ["", [Validators.minLength(0)]],
      keywordsRemarks : ["", [ Validators.minLength(0)]],
      detailsRemarks : ["", [Validators.minLength(0)]],
      referenceRemarks : ["", [Validators.minLength(0)]]
    });
    
   }

  ngOnChanges(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.service.getProjectById(params.projectId).subscribe(project => {
        this.projectid=params.projectId
        
        this.sr=project.remarks.summaryRemarks;
        this.kr=project.remarks.keywordsRemarks;
        this.dr=project.remarks.detailsRemarks;
        this.rr=project.remarks.referenceRemarks;
      },error=>{
        this.router.navigate(['/project']);
      });
    })
    
  }

  confirmReview(){
    console.log(this.confirmReviewForm.value)
    let remark=this.confirmReviewForm.value;
    remark.dateAdded=getTodayDate();
    this.service.addRemarks(remark,this.projectid).subscribe(res=>{
      //Send Notification
      this.to=filterUserId(this.contributors)
      this.messageDetails={"from":this.userId,"to":this.to,"payload":"Remarks added for \""+this.projectTitle+"\"","type":"alert warning"}
      console.log(this.messageDetails)
      this.service.addMessage(this.messageDetails).subscribe()
    })
    this.confirmReviewEmitter.emit();
  }
}
