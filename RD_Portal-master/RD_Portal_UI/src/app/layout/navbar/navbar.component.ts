import { Component, OnInit } from '@angular/core';

import { GlobalStoreService } from './../../service/global-store.service';
import { ApiClientService } from './../../service/api-client.service';

import {isUserWithProfile, hasAdminAccess} from './../../utils/project.utils';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  departments:any;
  userName: string;
  isProfileAvailable:boolean;
  isAdmin:boolean
  count:any=0;
  constructor(private service:ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnInit(): void {
    const {userDesignationCode, userName} = this.globalStore.getGlobalStore();
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
      this.userName = userName;
    })
    this.service.getApprovalProjects().subscribe( res=>{
      this.count+=res.length
    })
    this.service.getapprovalFunding().subscribe(res=>{
      this.count+=res.length
    })
    this.service.getApprovalPublication().subscribe(res=>{
      this.count+=res.length
    })
    this.isProfileAvailable = isUserWithProfile(userDesignationCode);
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }

}
