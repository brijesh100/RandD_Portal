import { Component, Input, OnChanges, OnInit, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiClientService } from './../../../../service/api-client.service';

import {getEditAccess,validateAndUpdate,filterUserId,hasAdminAccess, getTodayDate}  from "../../../../utils/project.utils";

@Component({
  selector: 'app-add-review-remark-modal',
  templateUrl: './add-review-remark-modal.component.html',
  styleUrls: ['./add-review-remark-modal.component.css']
})
export class AddReviewRemarkModalComponent implements OnChanges {
  @Input() isAdmin:boolean;
  @Input() projectid:string;
  @Input() projectTitle : any;
  @Output() confirmReviewEmitter = new EventEmitter<any>();
  
  reviewRemarkForm:FormGroup
  remark:any;
  date = getTodayDate();
  constructor(
    private service: ApiClientService,
    private fb: FormBuilder
    ) 
    { 
    this.reviewRemarkForm = this.fb.group({
      remark:["",[Validators.minLength(0)]],
      progress:["",[Validators.minLength(0)]],
      reviewDate:["",[Validators.minLength(0)]]
    });
  }

  ngOnChanges(): void {
 
  }
  addRemark(){
    this.remark = this.reviewRemarkForm.value;
    this.service.addReviewRemarks(this.projectid,this.remark).subscribe(res=>{
      this.confirmReviewEmitter.emit();
    });
  }
}
