import { Component, Input, Output, OnChanges, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-fp-summary-tile',
  templateUrl: './fp-summary-tile.component.html',
  styleUrls: ['./fp-summary-tile.component.css']
})
export class FpSummaryTileComponent implements OnChanges, DoCheck {
  @Input() summary:any;    
  @Input() isEditMode:any; 
  @Output() isFormValid = new EventEmitter<any>();

  fundingProjectSummaryForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.fundingProjectSummaryForm = this.fb.group({
      summary: [this.summary, [Validators.required, Validators.minLength(10)]]
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.RECEIVED_FP_TILE_INDEX.SUMMARY,
      value:this.fundingProjectSummaryForm.invalid
    });
  }

  getFormData(){
    if(this.fundingProjectSummaryForm.invalid) return null;
    const {summary} = this.fundingProjectSummaryForm.value;
    return summary;
  }

}
