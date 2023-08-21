import { Component, Input, OnChanges, EventEmitter, Output, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { GlobalStoreService } from '../../../../../service/global-store.service';

import { RD_CONSTANT } from '../../../../../keys/constant';
@Component({
  selector: 'app-fp-check-tile',
  templateUrl: './fp-check-tile.component.html',
  styleUrls: ['./fp-check-tile.component.css']
})
export class FpCheckTileComponent implements OnChanges {
  @Input() applicationChecks: any;
  @Input() isEditMode:any; 
  @Input() status:string;
  
  hodCheck:boolean;
  technicalCheck:boolean;
  proposalCheck:boolean;
  principalCheck:boolean;

  isOtherChecksPending:boolean;
  isFilled: boolean;

  checkform: FormGroup;
  constructor(private fb :FormBuilder,
    private globalStore: GlobalStoreService,
    ) { }
 
  ngOnChanges(): void {
    const { userDesignationCode } = this.globalStore.getGlobalStore();
    this.checkform = this.fb.group({
      filled:[this.applicationChecks?.filled],
      hod:[this.applicationChecks?.hod],
      technical:[this.applicationChecks?.technical],
      proposal:[this.applicationChecks?.proposal],
      principal:[this.applicationChecks?.principal]
    });
    const {hod, technical, proposal} = this.checkform.value;
    this.isOtherChecksPending = [hod, technical, proposal].includes(false);

    this.hodCheck = userDesignationCode === 'HOD' && !this.applicationChecks?.hod ?null:true;
    this.technicalCheck = userDesignationCode === 'ADMIN' && !this.applicationChecks?.technical ?null:true;
    this.proposalCheck = userDesignationCode === 'ADMIN' && !this.applicationChecks?.proposal ?null:true;
    this.principalCheck = userDesignationCode === 'MNGMT' && !this.applicationChecks?.principal && !this.isOtherChecksPending ?null:true;

    this.isFilled =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.FILLED;
  } 

  getFormData(){
    const applicationChecks = this.checkform.value;
    if(applicationChecks.principal === true){
      return {applicationChecks, status: RD_CONSTANT.FUNDING_STATUS_CODE.CHECKED};
    }
    else{
      return {applicationChecks};
    }
  }

}
