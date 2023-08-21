import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { RD_CONSTANT } from '../../../../../keys/constant';

@Component({
  selector: 'app-fp-keywords-tile',
  templateUrl: './fp-keywords-tile.component.html',
  styleUrls: ['./fp-keywords-tile.component.css']
})
export class FpKeywordsTileComponent implements OnChanges, DoCheck {

  @Input() keywords:any;   
  @Input() isEditMode:any; 
  @Output() isFormValid = new EventEmitter<any>();

  keywordsForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.keywordsForm = this.fb.group({
      keyword: this.fb.array(this.populateKeywords())
    });
  }
  
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.RECEIVED_FP_TILE_INDEX.KEYWORDS, 
      value:this.keywordsForm.invalid
    });
  }

  populateKeywords(){
    let initialKeywordArray = [];
    this.keywords?.forEach( keyword =>{
      initialKeywordArray.push(
        this.fb.control(keyword, [Validators.required,Validators.minLength(3)])
      )
    });
    return initialKeywordArray;
  }

  get keywordArray(){
    return <FormArray>this.keywordsForm.get('keyword');
  }

  addKeyword(){
    this.keywordArray.push(this.fb.control("", [Validators.required, Validators.minLength(3)]));
  }

  deleteKeyword(index){
    this.keywordArray.removeAt(index);
  }

  getFormData(){
    if(this.keywordsForm.invalid) return null;
    const {keyword} = this.keywordsForm.value;
    return keyword;
  }

}
