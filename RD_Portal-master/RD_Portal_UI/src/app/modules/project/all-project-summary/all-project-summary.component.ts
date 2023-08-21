import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';
import { RD_CONSTANT } from './../../../keys/constant';
import {isUserWithProfile, hasAdminAccess} from './../../../utils/project.utils';

@Component({
  selector: 'app-all-project-summary',
  templateUrl: './all-project-summary.component.html',
  styleUrls: ['./all-project-summary.component.css']
})
export class AllProjectSummaryComponent implements OnInit {
  projects:any;
  user:any;
  isadmin:any;
  snapshot:any;
  procount:any;
  isloading:boolean=true;
  darktheme: string;
  year: any;
  date: Date=new Date();
  departId: any;
  allProjectDetails:any;
  TRlevelText = RD_CONSTANT.TRlevelText;
  TRlevelBadge = RD_CONSTANT.TRlevelsColor;
  TRlevelContent = RD_CONSTANT.TRlevelContent;
  TRlevels = RD_CONSTANT.TRlevels;
  unfiltered:any;
  departments:any;
  filterData={
    dept:'all',
    trl:'all',
    year:'all'
  };
  years: any=[];
  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();
    this.darktheme=darktheme;
    this.year=this.date.getFullYear();
    // Get departemnts for filter
    this.service.getDepartments().subscribe(res =>{
      this.departments=res;
      this.departId=res.map(dep=>dep.departmentId);
    });
    // Year array for filter
    for(let i=this.year-7;i<=this.year;i++){
      this.years.push(i)
    }
    this.isadmin=hasAdminAccess(userDesignationCode);
    this.service.getOverAllSnapshot().subscribe(response=>{
      this.snapshot = [{
        tileName:RD_CONSTANT.SNAPSHOT_TILE.OnPROJECTS,
        tileCount:response.projects.completedCount
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.CoPROJECTS,
        tileCount:response.projects.onGoingCount
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.CONTRIBUTORS,
        tileCount:response.projects.contributors
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.LABS,
        tileCount:response.projects.researchLabs
      }
    ]
    })
    this.service.getAllProjectsSummary().subscribe( projectsSummary=>{
      this.allProjectDetails = projectsSummary.map(
        ({
          projectDepartment,
          start,
          status,
          isPriority,

        }) =>
        ({
          projectDepartment:projectDepartment[0],
          start,
          status,
          isPriority,

        }));
      if(userDesignationCode==='ADMIN' || userDesignationCode==='MNGMT'){
        projectsSummary=projectsSummary.filter(projectsSummary => !projectsSummary.review && (!projectsSummary.isarchived || projectsSummary.visibility ))
        this.projects = projectsSummary.map( project =>{
          let {status,...other} = project;
          status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
          return { status, ...other};
        });
      }
      else if(userDesignationCode==='HOD' || userDesignationCode==='PROFR')
      {
        projectsSummary=projectsSummary.filter(projectsSummary => projectsSummary.projectDepartment[0] === userDepartmentId && projectsSummary.approved && (!projectsSummary.isarchived || projectsSummary.visibility ))
        this.projects = projectsSummary.map( project =>{
          let {status,...other} = project;
          status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
          return { status, ...other};
        });
      }
      else{
        projectsSummary=projectsSummary.filter(projectsSummary => projectsSummary.status === '02')
        this.projects = projectsSummary.map( project =>{
          let {status,...other} = project;
          status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
          return { status, ...other};
        });
      }
      this.unfiltered=this.projects;
      this.isloading = false;
    });
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }
  filterFun(type,val){
    this.projects=this.unfiltered.filter(pro=>{
      if(this.filterData.dept!='all'){
        if(pro.projectDepartment[0]!=this.filterData.dept){
          return false
        }
      }

      if(this.filterData.trl!='all'){
        if(pro.isPriority==false){
          if(this.filterData.trl!='0'){
            return false;
          }
        }
        else if(pro.priority.technologyReadinessLevel!=this.filterData.trl){
          return false
        }
      }
      if(this.filterData.year!='all'){
        let date = new Date(pro.start);
        if(date.getFullYear() != Number(this.filterData.year)){
          return false
        }
      }
      return true
    })
  }
  reset(){
    this.filterData={
      dept:'all',
      trl:'all',
      year:'all'
    }
    this.projects=this.unfiltered;
  }
}
