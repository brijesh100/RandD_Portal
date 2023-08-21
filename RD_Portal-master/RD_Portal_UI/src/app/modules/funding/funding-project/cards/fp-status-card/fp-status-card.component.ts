import { FormControl, FormBuilder } from '@angular/forms';
import { Component, Output,Input, EventEmitter,OnChanges} from '@angular/core';

import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-fp-status-card',
  templateUrl: './fp-status-card.component.html',
  styleUrls: ['./fp-status-card.component.css']
})
export class FpStatusCardComponent implements OnChanges {
  @Input() status:string; 
  @Input() isExternal:boolean;
  @Input() isEditMode:string;  
  @Output() value = new EventEmitter<any>();
  viewStatus:string;
  badge:string;
  enableCheck:any;
  fundingProjectStatus:FormControl
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    if(!this.isExternal)
    {
    this.enableCheck = this.status < RD_CONSTANT.FUNDING_STATUS_CODE.SUBMITTED?true:null;
    this.fundingProjectStatus = this.fb.control(this.status);
    this.badge = this.status === RD_CONSTANT.FUNDING_STATUS_CODE.ACCEPTED ? 'success' : 'warning';
    this.badge = this.status === RD_CONSTANT.FUNDING_STATUS_CODE.REJECTED ? 'danger' : this.badge;
    this.viewStatus = RD_CONSTANT.FUNDING_STATUS_MAP[this.status];
    }
    else if(this.isExternal)
    {
      this.fundingProjectStatus = this.fb.control(this.status);
      this.badge = this.status === RD_CONSTANT.FUNDING_STATUS_CODE.ACCEPTED ? 'success' : 'warning';
    this.badge = this.status === RD_CONSTANT.FUNDING_STATUS_CODE.REJECTED ? 'danger' : this.badge;
    this.viewStatus = RD_CONSTANT.FUNDING_STATUS_MAP[this.status];
    }
  }

  getFormData(){
    return this.fundingProjectStatus.value;
  }
  handleChange(evt) {
    var target = evt.target;
   this.value.emit({
    value:this.fundingProjectStatus.value
  });
  }
  
}
