import { Component, OnInit } from '@angular/core';

import { ApiClientService } from 'src/app/service/api-client.service';
import { RD_CONSTANT } from 'src/app/keys/constant';
import { hasAdminAccess } from 'src/app/utils/project.utils';
import { GlobalStoreService } from 'src/app/service/global-store.service';
@Component({
  selector: 'app-priority-project-list',
  templateUrl: './priority-project-list.component.html',
  styleUrls: ['./priority-project-list.component.css']
})
export class PriorityProjectListComponent implements OnInit {
  user: any;
  isadmin: any;
  constructor( private service : ApiClientService, private globalStore: GlobalStoreService ) { }

  selectedTRL: String='all';
  selectedStatus: String = 'all';

  allPriorityProjects:any;
  priorityProjects:any;
  searchText:string;
  TRL=RD_CONSTANT.TRlevels;
  statusMap = RD_CONSTANT.PROJECT_STATUS_MAP;
  TRlevelText = RD_CONSTANT.TRlevelText;
  TRlevelBadge = RD_CONSTANT.TRlevelsColor;
  TRlevelContent = RD_CONSTANT.TRlevelContent;
  TRlevels = RD_CONSTANT.TRlevels;
  ngOnInit(): void {
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();

    this.isadmin=hasAdminAccess(userDesignationCode);

    this.service.getPriorityProjects().subscribe(projects =>{
      this.allPriorityProjects = projects.map( project =>{
        let {status,...other} = project;
        status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
        return { status, ...other};
      });
      this.priorityProjects = this.allPriorityProjects;
    });
  }

  filter(){
    if(this.selectedTRL == ''){
      this.priorityProjects = this.allPriorityProjects.filter(project => project.status == this.selectedStatus);
    }
    else if(this.selectedStatus == ''){
      this.priorityProjects = this.allPriorityProjects.filter(project => project.priority.technologyReadinessLevel == this.selectedTRL);
    }
    else{
      this.priorityProjects = this.allPriorityProjects.filter(project => project.priority.technologyReadinessLevel == this.selectedTRL && project.status == this.selectedStatus);
    }
  }

  reset(){
    this.selectedTRL = 'all';
    this.selectedStatus = 'all';
    this.ngOnInit();
  }

  filterFun(){
    this.priorityProjects=this.allPriorityProjects.filter(pro=>{
      if(this.selectedTRL!='all'){
        if(pro.priority.technologyReadinessLevel!=this.selectedTRL){
          return false
        }
      }
      if(this.selectedStatus!='all'){
        if(pro.status!=this.selectedStatus){
          return false
        }
      }
      return true
    })
  }
  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }
}
