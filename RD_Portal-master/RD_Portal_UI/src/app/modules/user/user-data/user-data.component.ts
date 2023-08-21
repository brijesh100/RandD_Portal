import { Component, Input, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() userId;
  publicationOverview:any;
  constructor(private service : ApiClientService) { }

  ngOnInit(): void {
    this.service.getUserPublicationOverview(this.userId).subscribe(res=>{
      this.publicationOverview=res;
    });
  }

}
