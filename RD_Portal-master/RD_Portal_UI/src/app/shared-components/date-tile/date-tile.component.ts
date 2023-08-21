import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-date-tile',
  templateUrl: './date-tile.component.html',
  styleUrls: ['./date-tile.component.css']
})
export class DateTileComponent {
  @Input() showTile:boolean;
  @Input() createdAt:any;
  @Input() updatedAt:any;
}
