import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-funding-additional-details-tile',
  templateUrl: './funding-additional-details-tile.component.html',
  styleUrls: ['./funding-additional-details-tile.component.css']
})
export class FundingAdditionalDetailsTileComponent implements OnChanges, DoCheck {
  @Input() addlDetails:any;   
  @Input() isEditMode:any;   
  @Output() isFormValid = new EventEmitter<any>();

  additionalDetailsForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  
  ngOnChanges(): void {
    this.additionalDetailsForm = this.fb.group({
      additionalDetails: this.fb.array(this.populateAdditionalDetailsGroup())
    });
  }
  
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.FUNDING_TILE_INDEX.ADDL_DETAIL, 
      value:this.additionalDetailsForm.invalid
    });
  }
  populateAdditionalDetailsGroup(){
    let initialAdditionlDetailsArray = [];
    this.addlDetails?.forEach( cont =>{
      initialAdditionlDetailsArray.push(  this.fb.group({
        title:[cont.title,[Validators.required, Validators.minLength(3)]],
        detail:[cont.detail,[Validators.required, Validators.minLength(5)]]
      }));
    });
    return initialAdditionlDetailsArray;
  }
  
  get additionalDetailsArray(){
    return <FormArray>this.additionalDetailsForm.get('additionalDetails');
  }

  addAdditionalDetail(){
    this.additionalDetailsArray.push(this.getNewAdditionalDetail())
  }

  getNewAdditionalDetail(){
    return this.fb.group({
      title:['',[Validators.required, Validators.minLength(3)]],
      detail:['',[Validators.required, Validators.minLength(5)]]
    })
  }

  deleteAdditionalDetail(index){
    this.additionalDetailsArray.removeAt(index);
  }
  
  getFormData(){
    if(this.additionalDetailsForm.invalid) return null;
    const {additionalDetails} = this.additionalDetailsForm.value;
    return additionalDetails;
  }
}
