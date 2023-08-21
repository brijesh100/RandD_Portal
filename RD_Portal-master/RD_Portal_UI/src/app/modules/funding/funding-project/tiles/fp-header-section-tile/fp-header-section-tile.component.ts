import { Component, Input, OnChanges} from '@angular/core';

@Component({
  selector: 'app-fp-header-section-tile',
  templateUrl: './fp-header-section-tile.component.html',
  styleUrls: ['./fp-header-section-tile.component.css']
})
export class FpHeaderSectionTileComponent implements OnChanges {
  @Input() nameOfGrant:String;   
  @Input() fundingOrganisation:String;   
  @Input() fundingType:String;   
  @Input() project:any;
  @Input() isEditMode:boolean;
  
  constructor() { }

  ngOnChanges(): void {
  }

}
