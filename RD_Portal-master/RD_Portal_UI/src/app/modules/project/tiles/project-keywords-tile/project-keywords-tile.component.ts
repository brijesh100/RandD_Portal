import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-keywords-tile',
  templateUrl: './project-keywords-tile.component.html',
  styleUrls: ['./project-keywords-tile.component.css']
})

export class ProjectKeywordsTileComponent implements OnChanges, DoCheck {
  @Input() keywords:any;   
  @Input() isEditMode:any; 
  @Input() edited:boolean;
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
      index:RD_CONSTANT.PROJECT_TILE_INDEX.KEYWORDS, 
      value:this.keywordsForm.invalid
    });
  }

  populateKeywords(){
    return this.keywords.map( keyword =>{
      return this.fb.control(keyword, [Validators.required,Validators.minLength(3)])
    })
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
