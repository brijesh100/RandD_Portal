import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-project-update-modal',
  templateUrl: './project-update-modal.component.html',
  styleUrls: ['./project-update-modal.component.css']
})
export class ProjectUpdateModalComponent implements OnChanges {
  @Input() isEditMode:boolean;
  @Output() confirmUpdateEmitter = new EventEmitter<any>();

  confirmUpdateForm: FormGroup; 
  constructor(private fb: FormBuilder) { }

  ngOnChanges(): void {
    this.confirmUpdateForm = this.fb.group({
      commitMessage : ["", [Validators.required, Validators.minLength(8)]]
    });
  }

  get commitMessage(){
    return this.confirmUpdateForm.get('commitMessage');
  }

  confirmUpdate(){
      this.confirmUpdateEmitter.emit({commitMessage:this.commitMessage.value});
  }
}
