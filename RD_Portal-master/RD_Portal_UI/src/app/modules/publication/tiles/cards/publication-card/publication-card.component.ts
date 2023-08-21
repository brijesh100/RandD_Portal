import { Component, OnInit, Input } from '@angular/core';
import { ApiClientService } from '../../../../../service/api-client.service';
import { GlobalStoreService } from '../../../../../service/global-store.service';
@Component({
  selector: 'app-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.css']
})
export class PublicationCardComponent implements OnInit {
  user:any;
  userId:any;
  @Input() publication:any;

  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    
  }
  showUserOverview(userId){
    this.service.getUserById(userId).subscribe(userdata =>{
      this.user = userdata;
    })
  }
}
