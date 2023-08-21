import { Component,Input, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';

import { ApiClientService } from '../../../../service/api-client.service';
import { RD_CONSTANT } from './../../../../keys/constant';
@Component({
  selector: 'app-project-visibility-card',
  templateUrl: './project-visibility-card.component.html',
  styleUrls: ['./project-visibility-card.component.css']
})
export class ProjectVisibilityCardComponent implements OnChanges {

  
  @Input() visibility:any;   
  @Input() isEditMode:any; 
  @Input() projectid:any;
  projectVisibility: FormControl;
  badge:String;
  viewVisibility: String;
  constructor(private fb: FormBuilder,private service: ApiClientService) { }

  ngOnChanges(): void {
    this.badge = this.visibility;
    this.projectVisibility = this.fb.control(this.visibility);
    if(this.visibility==true)
    {
      this.viewVisibility="Visible"
      this.badge='badge-success'
    }
    else{
      this.viewVisibility="Hidden"
      this.badge="badge-warning"
    }
    //this.viewStatus = RD_CONSTANT.PROJECT_STATUS_MAP[this.status];
  }

  getFormData(){
    return this.visibility;
  }
  visibilitychanger(){
    if(this.visibility==false)
    {
      this.viewVisibility="Visible"
      this.badge='badge-success'
      this.visibility=true
      
    }
    else if(this.visibility==true)
    {
      this.viewVisibility="Hidden"
      this.badge="badge-warning"
      this.visibility=false
    }
  }
  
}
