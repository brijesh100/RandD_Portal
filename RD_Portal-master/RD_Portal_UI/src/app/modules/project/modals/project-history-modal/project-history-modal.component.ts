import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-project-history-modal',
  templateUrl: './project-history-modal.component.html',
  styleUrls: ['./project-history-modal.component.css']
})

export class ProjectHistoryModalComponent implements OnChanges {
  @Input() projectHistory:any;   
  @Input() isEditMode:any;
  constructor() { }

  ngOnChanges(): void {

  } 
}
