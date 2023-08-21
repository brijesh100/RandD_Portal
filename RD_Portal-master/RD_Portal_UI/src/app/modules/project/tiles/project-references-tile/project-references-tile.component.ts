import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-references-tile',
  templateUrl: './project-references-tile.component.html',
  styleUrls: ['./project-references-tile.component.css']
})
export class ProjectReferencesTileComponent implements OnChanges {
  @Input() referenceLink:any;   
  @Input() isEditMode:any; 
  @Input() edited:boolean;
  @Output() isFormValid = new EventEmitter<any>();
  
  referenceLinkForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.referenceLinkForm = this.fb.group({
      referenceLink: this.fb.array(this.populateReferenceLinks())
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.PROJECT_TILE_INDEX.REFERENCE,
      value:this.referenceLinkForm.invalid
    });
  }

  populateReferenceLinks(){
    return this.referenceLink.map( reference =>{
     return this.fb.control(reference,[Validators.required, Validators.minLength(5)])
    })
  }

  get referenceLinkArray(){
    return <FormArray>this.referenceLinkForm.get('referenceLink');
  }

  addReferenceLink(){
    this.referenceLinkArray.push(this.fb.control('',[Validators.required, Validators.minLength(5)]))
  }

  deleteReferenceLink(index){
    this.referenceLinkArray.removeAt(index);
  }

  getFormData(){
    if(this.referenceLinkForm.invalid) return null;
    const {referenceLink} = this.referenceLinkForm.value;
    return referenceLink;
  }
}
