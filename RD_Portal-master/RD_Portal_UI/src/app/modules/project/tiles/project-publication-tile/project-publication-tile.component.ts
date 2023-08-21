import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-project-publication-tile',
  templateUrl: './project-publication-tile.component.html',
  styleUrls: ['./project-publication-tile.component.css']
})

export class ProjectPublicationTileComponent implements OnChanges {
  @Input() userId:any;
  @Input() publications:any;
  constructor(private service: ApiClientService, private activatedRoute: ActivatedRoute) { }

  ngOnChanges(): void {
    console.log(this.publications)
  }

}
