import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RD_CONSTANT } from '../../../../keys/constant';
@Component({
  selector: 'app-priority-project-tile',
  templateUrl: './priority-project-tile.component.html',
  styleUrls: ['./priority-project-tile.component.css']
})
export class PriorityProjectTileComponent implements OnChanges {
  @Input() priorityProjectDetails:any;  
  @Input() isEditMode:any; 
  @Input() isAdmin:any; 
  TRlevels=RD_CONSTANT.TRlevels;
  TRlevelText = RD_CONSTANT.TRlevelText;
  TRlevelBadge = RD_CONSTANT.TRlevelsColor;
  TRlevelContent = RD_CONSTANT.TRlevelContent;
  TrColors = RD_CONSTANT.TRlevelsColor;
  badgeColor:any='badge-warning';
  @Output() isFormValid = new EventEmitter<any>(); 
  projectPriorityForm:FormGroup;
  collaborators:any = [];
  constructor(private fb:FormBuilder) { }

  ngOnChanges(): void {
    this.projectPriorityForm = this.fb.group({
      technologyReadinessLevel: [this.priorityProjectDetails.technologyReadinessLevel, Validators.required],
      patentCount: [this.priorityProjectDetails.patentCount],
      publicationCount: [this.priorityProjectDetails.publicationCount],
      typedCollaborators: [''],
    });
    this.badgeColor = this.TrColors[this.priorityProjectDetails.technologyReadinessLevel];
    this.collaborators = this.priorityProjectDetails.collaborators;
  }
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.PROJECT_TILE_INDEX.SUMMARY,
      value:this.projectPriorityForm.invalid
    });
  }
  getFormData(){
    if(this.projectPriorityForm.invalid) return null;
    const {technologyReadinessLevel, patentCount, publicationCount} = this.projectPriorityForm.value;
    return {
      technologyReadinessLevel,
      patentCount,
      publicationCount,
      collaborators:this.collaborators
    };
  }
  addCollaborator(collaboratorId){
    if(!this.collaborators.includes(collaboratorId) && collaboratorId != ""){
        this.collaborators.push(collaboratorId);
        this.projectPriorityForm.patchValue({typedCollaborators:""});
    }   
  }
  removeCollaborator(memberId){
    this.collaborators = this.collaborators.filter(people => (people != memberId ));
  }

  clearCollaboratorDataList(){
    this.collaborators = [];
  }

}
