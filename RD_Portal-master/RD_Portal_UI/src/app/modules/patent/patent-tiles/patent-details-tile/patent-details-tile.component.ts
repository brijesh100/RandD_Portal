import { Component, OnChanges, Input } from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';

@Component({
  selector: 'app-patent-details-tile',
  templateUrl: './patent-details-tile.component.html',
  styleUrls: ['./patent-details-tile.component.css']
})
export class PatentDetailsTileComponent implements OnChanges {

  @Input() patent:any;
  constructor(private service: ApiClientService) { }

  ngOnChanges(): void {
  }

}
