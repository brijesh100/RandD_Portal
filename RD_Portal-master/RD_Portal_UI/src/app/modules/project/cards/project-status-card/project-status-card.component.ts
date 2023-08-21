import { Component, Input, OnChanges } from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-status-card',
  templateUrl: './project-status-card.component.html',
  styleUrls: ['./project-status-card.component.css']
})
export class ProjectStatusCardComponent implements OnChanges {

  @Input() status:any;   
  @Input() isEditMode:any; 

  projectStatus: FormControl;
  badge:String;
  viewStatus: String;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    console.log("status check ", this.status);
    if(this.status == "00" || this.status == "01"){
      this.badge = 'badge-warning';
    }
    else if(this.status == "02"){
      this.badge = 'badge-success';
    }
    else if(this.status == "03"){
      this.badge = 'badge-danger';
    }
    
    this.projectStatus = this.fb.control(this.status);
    this.viewStatus = RD_CONSTANT.PROJECT_STATUS_MAP[this.status];
  }

  getFormData(){
    return this.projectStatus.value;
  }

}
