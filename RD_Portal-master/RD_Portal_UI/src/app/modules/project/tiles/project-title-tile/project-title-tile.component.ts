import { Component, Input, Output, OnChanges, EventEmitter, DoCheck } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';

import { RD_CONSTANT } from './../../../../keys/constant';

@Component({
  selector: 'app-project-title-tile',
  templateUrl: './project-title-tile.component.html',
  styleUrls: ['./project-title-tile.component.css']
})
export class ProjectTitleTileComponent implements OnChanges, DoCheck {
  @Input() projectTitle:any;   
  @Input() isEditMode:any; 
  @Input() isPriority:any; 
  @Input() isAdmin:any; 
  @Output() isFormValid = new EventEmitter<any>();
  projectTitleForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.projectTitleForm = this.fb.group({
      projectTitle: [this.projectTitle, [Validators.required, Validators.minLength(10)]]
    });
  }

  ngDoCheck(){
      this.isFormValid.emit({
        index:RD_CONSTANT.PROJECT_TILE_INDEX.TITLE,
        value:this.projectTitleForm.invalid
      });
  }

  getFormData(){
    if(this.projectTitleForm.invalid) return null;
    const {projectTitle} = this.projectTitleForm.value;
    return projectTitle;
  }

}
