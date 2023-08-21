import { Component,Input, OnChanges, EventEmitter, Output, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-funding-description-tile',
  templateUrl: './funding-description-tile.component.html',
  styleUrls: ['./funding-description-tile.component.css']
})
export class FundingDescriptionTileComponent implements OnChanges, DoCheck {
  @Input() description:any;   
  @Input() isEditMode:any; 
  @Output() isFormValid = new EventEmitter<any>();
  constructor(private fb: FormBuilder) { }
  fundingDescriptionForm:FormGroup;
  ngOnChanges(): void {
    this.fundingDescriptionForm = this.fb.group({
      descriptionOfScheme: [this.description, [Validators.required, Validators.minLength(10)]]
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.FUNDING_TILE_INDEX.DESCRIPTION,
      value:this.fundingDescriptionForm.invalid
    });
  }

  getFormData(){
    if(this.fundingDescriptionForm.invalid) return null;
    const {descriptionOfScheme} = this.fundingDescriptionForm.value;
    return descriptionOfScheme;
  }

}
