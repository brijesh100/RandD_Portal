import { Component, Input,OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-project-review-tile',
  templateUrl: './project-review-tile.component.html',
  styleUrls: ['./project-review-tile.component.css']
})
export class ProjectReviewTileComponent implements OnChanges {
  @Input() remarks:any; 
  @Input() review:any; 
  constructor() { }

  ngOnChanges(): void {
  }

}
