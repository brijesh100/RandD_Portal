import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';
import {isUserWithProfile, hasAdminAccess} from './../../../utils/project.utils';
import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css'],
})
export class ResearchPageComponent implements OnInit {
  research: any;
  department: any;
  completedProjects: any;
  ongoingProjects: any;
  projects: any;
  user:any;
  labSnapshot:any;
  isadmin:any;
  contributors: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) {

  }

  ngOnInit() {
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();
    this.activatedRoute.params.subscribe((params) => {
      this.service.getDepartments().subscribe(departments => {
        this.department = departments.filter(dept => dept.departmentId === params.departmentId)[0];
        this.research = this.department.researchLab.filter(research => research.researchLabId === params.researchId)[0];
        this.service.getProjectsByLabId(params.researchId).subscribe( projects =>{
          this.projects = projects.map( project =>{
            let {status,...other} = project;
            status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
            return { status, ...other};
          });
          this.ongoingProjects=this.projects.filter(project=>project.status===RD_CONSTANT.PROJECT_STATUS_MAP['01'])
          this.completedProjects=this.projects.filter(project=>project.status===RD_CONSTANT.PROJECT_STATUS_MAP['02'])
          this.service.getDepartmentUsers(params.departmentId).subscribe(user=>{
            this.contributors=user.filter(user => user.details.lab==this.research.researchLabName).length;
            console.log(this.contributors);
          
          this.isadmin=hasAdminAccess(userDesignationCode);
          this.labSnapshot = [{
            tileName:'Ongoing Projects',
            tileCount:this.ongoingProjects.length
          },
          {
            tileName:'Completed Projects',
            tileCount:this.completedProjects.length
          },
          {
            tileName:'Funded Projects',
            tileCount:'50+'
          },
          {
            tileName:'Contributors',
            tileCount:this.contributors
          }
        ]
      })
    })
    });
  });
  }

  showUserOverview(userId){
    this.service.getUserById(userId.trim()).subscribe(userdata =>{
      this.user = userdata;
    })
  }

}
