import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../../../../../service/api-client.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-publication-title-tile',
  templateUrl: './publication-title-tile.component.html',
  styleUrls: ['./publication-title-tile.component.css']
})
export class PublicationTitleTileComponent implements OnInit {
  @Input() title:any;
  @Input() name:any;
  @Input() date:any;
  @Input() publication:any;
  constructor( 
    private service: ApiClientService,) { }

  ngOnInit(): void {
  }
  download(){
    const payload = {path :this.publication.file.filledApplication.path+'/'+this.publication.file.filledApplication.fileName}
    console.log(payload)
    this.service.downloadPublicationDoc(payload).subscribe(blob=>{
      saveAs(blob);
    });
  }
}
