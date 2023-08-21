import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ApiClientService } from '../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../service/global-store.service';

@Component({
  selector: 'app-consultancy-card',
  templateUrl: './consultancy-card.component.html',
  styleUrls: ['./consultancy-card.component.css']
})
export class ConsultancyCardComponent implements OnChanges {

  user:any;
  userId:any;
  badge:string;
  @Input() consultancy:any;

  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnChanges(): void {
    if(this.consultancy){
      if(this.consultancy.consultancyStatus=='Ongoing'){
        this.badge='badge-warning';
      }
      else{
        this.badge='badge-success';
      }
    }
  }

  showUserOverview(userId){
    userId=userId.split('-')[0];
    this.service.getUserById(userId).subscribe(userdata =>{
      this.user = userdata;
    })
  }


}
