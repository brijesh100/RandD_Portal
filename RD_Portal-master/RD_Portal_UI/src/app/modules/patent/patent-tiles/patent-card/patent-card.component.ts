import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../service/global-store.service';

@Component({
  selector: 'app-patent-card',
  templateUrl: './patent-card.component.html',
  styleUrls: ['./patent-card.component.css']
})
export class PatentCardComponent implements OnChanges {
  user:any;
  userId:any;
  badge:string;
  @Input() patent:any;

  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }
  ngOnChanges(): void {
    if(this.patent){
      if(this.patent.patentStatus=='Filed'){
        this.badge='badge-warning';
      }
      else if(this.patent.patentStatus=='Published' || this.patent.patentStatus=='FER Submitted' || this.patent.patentStatus=='Hearing Completed'){
        this.badge='badge-info';
      }
      else{
        this.badge='badge-success';
      }
    }
  }
  showUserOverview(userId){
    console.log(userId)
    userId=userId.split('-')[0];
    console.log(userId)
    this.service.getUserById(userId).subscribe(userdata =>{
      console.log(userdata)
      this.user = userdata;
    })
  }

}
