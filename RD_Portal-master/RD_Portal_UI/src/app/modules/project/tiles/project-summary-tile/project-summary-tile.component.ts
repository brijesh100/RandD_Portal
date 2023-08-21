import { Component, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-summary-tile',
  templateUrl: './project-summary-tile.component.html',
  styleUrls: ['./project-summary-tile.component.css']
})
export class ProjectSummaryTileComponent implements OnChanges {
  @Input() projectSummary:any;   
  @Input() isEditMode:any; 
  @Input() isAdmin:any;
  @Input() edited:boolean;
  @Output() isFormValid = new EventEmitter<any>();

  projectSummaryForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.projectSummaryForm = this.fb.group({
      projectSummary: [this.projectSummary, [Validators.required, Validators.minLength(10)]]
    });
  }

  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.PROJECT_TILE_INDEX.SUMMARY,
      value:this.projectSummaryForm.invalid
    });
  }

  getFormData(){
    if(this.projectSummaryForm.invalid) return null;
    const {projectSummary} = this.projectSummaryForm.value;
    return projectSummary;
  }

}
