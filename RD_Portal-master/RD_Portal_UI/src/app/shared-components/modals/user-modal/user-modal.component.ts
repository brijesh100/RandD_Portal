import { Component, Input, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {
  @Input() user:any;
  constructor(private service: ApiClientService,) { }
  ngOnInit(): void {
  }
  // showUserOverview(userId){
  //   this.service.getUserById(userId.trim()).subscribe(userdata =>{
  //     this.user = userdata;
  //   })
  // }
}
