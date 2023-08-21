import { Component, Input, Output, OnChanges, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import{getTodayDate} from '../../../../../utils/project.utils';
import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-funding-header-section-tile',
  templateUrl: './funding-header-section-tile.component.html',
  styleUrls: ['./funding-header-section-tile.component.css']
})
export class FundingHeaderSectionTileComponent implements OnChanges, DoCheck {
  @Input() nameOfGrant:String;   
  @Input() fundingOrganisation:String;   
  @Input() deadline:String;   
  @Input() isEditMode:any; 
  @Output() isFormValid = new EventEmitter<any>();
  
  minDate:String = getTodayDate();
  fundingHeaderSectionForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.fundingHeaderSectionForm = this.fb.group({
      nameOfGrant: [this.nameOfGrant, [Validators.required, Validators.minLength(5)]],
      fundingOrganisation: [this.fundingOrganisation, [Validators.required, Validators.minLength(5)]],
      deadline: [this.deadline?.substring(0,10), [Validators.required]]
    });
  }

  ngDoCheck(){
      this.isFormValid.emit({
        index:RD_CONSTANT.FUNDING_TILE_INDEX.HEADER,
        value:this.fundingHeaderSectionForm.invalid
      });
  }

  getFormData(){
    if(this.fundingHeaderSectionForm.invalid) return null;
    const {nameOfGrant,fundingOrganisation,deadline} = this.fundingHeaderSectionForm.value;
    return {nameOfGrant,fundingOrganisation,deadline};
  }

}
