import { Component, OnInit  } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';

import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-department-approval',
  templateUrl: './department-approval.component.html',
  styleUrls: ['./department-approval.component.css']
})
export class DepartmentApprovalComponent implements OnInit {

  departmentId:any
  department:any
  projects:any
  projectSum:any
  Afundings:any;
  Rfundings:any;

  publications:any;
  allprojects:any=[];

  allRfundings:any=[];
  allpublications:any=[];
  archive:boolean=false;
  archivedUsers:any;
  ix=0;
  proDrop:any=false;
  pubDrop:any=false;
  funDrop:any=false;
  userDrop:any=false;
  onePublication:any;
  constructor(private activatedRoute: ActivatedRoute,private service:ApiClientService) { }

  ngOnInit(): void {
    this.refresh()
  }
  refresh(){
    this.activatedRoute.params.subscribe(params =>{
      this.departmentId=params;
      this.service.getDepartments().subscribe( departments =>{
        this.department = departments.filter( dept => dept.departmentId === params.departmentId)[0];
        this.service.getallarchived(this.departmentId).subscribe(res=>{
            this.archivedUsers=res.users
            this.allprojects[1]=res?.projects
            this.allpublications[1]=res?.publications
            this.allRfundings[1]=res?.fundingprojects

            this.shift();
        })
      })
      this.service.getApprovalProjects().subscribe( projectsSummary =>{
        this.projectSum=projectsSummary.filter(projectsSummary => projectsSummary.projectDepartment[0] === params.departmentId)
        this.allprojects[0] = this.projectSum.filter(projectSum => !projectSum.isarchived).map( project =>{
          let {status,...other} = project;
          status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
          return { status, ...other};
        });
        this.projects=this.allprojects[0]
        this.shift();
      })
      this.service.getapprovalFunding().subscribe(fundings=>{
        this.allRfundings[2]=fundings.filter(fundings => fundings.Department[0]===params.departmentId && fundings.isExternal && !fundings.isarchived)
        this.allRfundings[0]=fundings.filter(fundings => fundings.Department[0]===params.departmentId && fundings.isUserApplied && !fundings.isarchived)
        this.Rfundings=this.allRfundings[0]
        this.ix=this.Rfundings[0].length
        this.shift();
      })
      this.service.getApprovalPublication().subscribe(publication=>{
        this.allpublications[0]=publication.filter(publications => publications.Department[0]===params.departmentId && !publications.isarchived)
        this.publications=this.allpublications[0]
        this.shift();
      })
      this.shift();
    })
  }
  change()
  {
    this.archive=!this.archive;
    this.shift();
  }
  shift(){

    if(!this.archive)
    {
      this.publications=this.allpublications[0]
      this.projects=this.allprojects[0]
      this.Rfundings=this.allRfundings[0]

    }
    else
    {
      this.publications=this.allpublications[1]
      this.projects=this.allprojects[1]
      this.Rfundings=this.allRfundings[1]

    }
  }
}
