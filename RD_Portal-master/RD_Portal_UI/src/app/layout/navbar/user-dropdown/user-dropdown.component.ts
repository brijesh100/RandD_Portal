import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';
@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent{
  @Input() userName: any;
  @Input() isProfileAvailable: boolean;
  @Input() isAdmin: boolean;
  @Input() count: any;
  constructor(private route: Router, private service:ApiClientService,private globalStore: GlobalStoreService){}

  logout(){
    const {userId}=this.globalStore.getGlobalStore();
    
    let d=false
    this.service.setlastseen(userId).subscribe(res=>{
      localStorage.clear();
      this.route.navigate(['auth/login']);
    })
    
  }
}
