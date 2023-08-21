import { Component, OnChanges, Input ,OnInit} from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';


@Component({
  selector: 'app-consultancy-details-tile',
  templateUrl: './consultancy-details-tile.component.html',
  styleUrls: ['./consultancy-details-tile.component.css']
})
export class ConsultancyDetailsTileComponent implements OnInit {

  @Input() consultancy:any;
  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
  }

}
