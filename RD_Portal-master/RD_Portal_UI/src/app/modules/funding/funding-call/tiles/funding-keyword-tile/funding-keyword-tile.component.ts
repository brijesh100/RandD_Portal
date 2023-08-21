import { Component, Input, OnChanges, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators,FormControl, FormArray, FormBuilder} from '@angular/forms';
@Component({
  selector: 'app-funding-keyword-tile',
  templateUrl: './funding-keyword-tile.component.html',
  styleUrls: ['./funding-keyword-tile.component.css']
})
export class FundingKeywordTileComponent implements OnChanges {
  @Input() keywords:any=[];   
  @Input() isEditMode:any;   
  @Output() isFormValid = new EventEmitter<any>();

  keywordsForm = new FormGroup({
    keyword: new FormControl()
  });
  
  constructor(private fb: FormBuilder) { }
  
  ngOnChanges(): void {
    this.keywordsForm = this.fb.group({
      keyword: this.fb.array(this.populateKeywords())
    });
  }
  populateKeywords(){
    let keywordarray = [];
    this.keywords?.forEach( cont =>{
      keywordarray.push(cont);
    });
    return keywordarray;
  }

  // get keywordArray(){
  //   return <FormArray>this.keywordsForm.get('keyword');
  // }

  addKeyword(){
    this.keywordArray.push(this.fb.control("", [Validators.required, Validators.minLength(3)]));
  }

  deleteKeyword(index){
    this.keywordArray.removeAt(index);
  }

  get keywordArray(){
    return <FormArray>this.keywordsForm.get('keyword');
  }

  addAdditionalDetail(){
    this.keywordArray.push(this.getNewKeyword())
  }

  getNewKeyword(){
    return this.fb.group({
      keyword:['',[Validators.required, Validators.minLength(3)]],
    })
  }


  getFormData(){
    if(this.keywordsForm.invalid) return null;
    const {keyword} = this.keywordsForm.value;
    return keyword;
  }

}
