import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-funding-links-card',
  templateUrl: './funding-links-card.component.html',
  styleUrls: ['./funding-links-card.component.css']
})
export class FundingLinksCardComponent implements OnChanges {
  @Input() urls:any;   
  @Input() isEditMode:any; 
  @Output() isFormValid = new EventEmitter<any>();

  fundingUrlForm: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.fundingUrlForm = this.fb.group({
      fundingUrls: this.fb.array(this.populateFundingUrls())
    });
  }
  
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.FUNDING_TILE_INDEX.LINKS, 
      value:this.fundingUrlForm.invalid
    });
  }

  populateFundingUrls(){
    return this.urls? this.urls.map( item =>{
      return this.fb.group({
        title: [item.title, [Validators.required,Validators.minLength(3)]],
        url: [item.url, [Validators.required,Validators.minLength(5)]]
      })
    }):[];
  }

  get fundingUrlsArray(){
    return <FormArray>this.fundingUrlForm.get('fundingUrls');
  }

  addFundingUrl(){
    this.fundingUrlsArray.push(this.fb.group({
      title: ['', [Validators.required,Validators.minLength(3)]],
      url: ['', [Validators.required,Validators.minLength(5)]]
    }));
  }

  deleteFundingUrl(index){
    this.fundingUrlsArray.removeAt(index);
  }

  getFormData(){
    if(this.fundingUrlForm.invalid) return null;
    const {fundingUrls} = this.fundingUrlForm.value;
    return fundingUrls;
  }

}
