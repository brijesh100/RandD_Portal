import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant'

@Component({
  selector: 'app-fp-amount-tile',
  templateUrl: './fp-amount-tile.component.html',
  styleUrls: ['./fp-amount-tile.component.css']
})
export class FpAmountTileComponent implements OnChanges {

  @Input() fundingAmount:any;   
  @Input() isEditMode:any; 
  @Input() status:string;
  @Input() isExternal:boolean;
  @Output() isFormValid = new EventEmitter<any>();
  
  isAccepted: boolean;
  fundingAmountForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.isAccepted = RD_CONSTANT.FUNDING_STATUS_CODE.ACCEPTED === this.status;
    this.fundingAmountForm = this.fb.group({
      applied:[this.fundingAmount?.applied],
      received: [this.fundingAmount?.received],
      consumable: [this.fundingAmount?.consumable],
      nonConsumable: [this.fundingAmount?.nonConsumable],
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.RECEIVED_FP_TILE_INDEX.AMOUNT,
      value:this.fundingAmountForm.invalid
    });
  }

  getFormData(){
    //if(this.fundingAmountForm.invalid) return null;
    const {applied,received,consumable,nonConsumable} = this.fundingAmountForm.value;
    return {applied,received,consumable,nonConsumable};
  }

}
