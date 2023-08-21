import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';
@Component({
  selector: 'app-user-list-card',
  templateUrl: './user-list-card.component.html',
  styleUrls: ['./user-list-card.component.css']
})

export class UserListCardComponent implements OnInit {
  @Input() departmentId;
  @Input() archive;
  @Input() archivedUsers;
  userlist:any;
  users :any;
  constructor(private service:ApiClientService) { }

  ngOnInit(): void {
    this.service.getDepartmentUsers(this.departmentId.departmentId).subscribe(res=>{
      this.users=res.filter(res=> res.isarchived==false);
    })
    
  }
  checklast(ls){
    var date1 = new Date(); 
    if(ls){
      var date2 = new Date(ls);
      var dit = date1.getTime() - date2.getTime(); 
      var did = dit / (1000 * 3600 * 24);
      if(did>9){
        return 1
      }
      else{
        return 0
      }
    }
    else{
      return -1
    }
  }

}
