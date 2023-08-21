import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import{ RD_CONSTANT} from '../../../keys/constant';

import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../utils/project.utils';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {
  lastDate = getYesterdayDate();
  project = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    projectDepartment: new FormControl(''),
    projectLab: new FormControl('', [Validators.required]),
    createdAt: new FormControl(this.lastDate),
    isOldProject: new FormControl(''),
    searchedContributorId: new FormControl(''),
    start: new FormControl('', [Validators.required]),
    end:new FormControl('')
  });
  departments:any;
  researchLabs:any;
  team:any;
  userIdName:any;
  contributorIds:any = [];
  successMessage:string;
  errorMessage:string;
  userDept:any;
  userDeptId:any;
  departmentarray: any=[];
  submitted = false;
  usererror: any;
  constructor(
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router,
    private fb:FormBuilder
    ) { }

  ngOnInit(): void {
    const {userId,userName,userDepartmentId} = this.globalStore.getGlobalStore();
    this.userDeptId=userDepartmentId
    
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId,
                   "departmentName" :dept.departmentName,
                   "researchLab":dept.researchLab})
      );
      this.departments = allDepartments;
      this.departmentarray = [userDepartmentId];
      this.userDept=this.departments.filter(dept=>dept.departmentId === userDepartmentId)[0].departmentName;
      this.getLabs(this.userDeptId);
    });
    
    this.userIdName = `${userId}-${userName}`;
    
    this.team = [this.userIdName]; 
  }

  getLabs(deptId){
    this.researchLabs= this.departments.filter(dept => dept.departmentId === deptId)[0].researchLab;
  }

  searchContributorIds(searchId){
    searchId=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if( this.contributorIds.length === 0 || searchId !== this.contributorIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.contributorIds = userIds;
      })
    } 
  }

  addContributorToTeam(contributorId){
    this.service.getUserById(contributorId.split('-')[0]).subscribe(res=>{
      if(res)
      {
        if(!this.team.includes(contributorId) && 
          contributorId != "" && 
          this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT){
            this.team.push(contributorId);
            this.project.patchValue({searchedContributorId:""});
            this.usererror='';
        }   
      }
    },error => {
      this.usererror = error;
    });
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  createProject(){
    this.submitted = true;
    if (this.project.invalid) {
      console.log("ERROR",this.f)
      return;
    }
    const {searchedContributorId, ...projectDetails } = this.project.value;
    projectDetails.team = filterUserId(this.team);
    projectDetails.projectDepartment =this.departmentarray;
    projectDetails.projectLab = [projectDetails.projectLab];
    projectDetails.isOldProject=true;
    projectDetails.createdAt = getCreatedDate(projectDetails.createdAt, projectDetails.isOldProject);
    this.service.createNewProject(projectDetails).subscribe( response =>{
      this.clearMessage();
      this.project.reset();
      this.router.navigate([`/project/${response.projectId}/edit`]);
      this.team=[this.userIdName];
    },error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }
  addDepartment(dept){
    if(!this.departmentarray.includes(dept)){
    this.departmentarray.push(dept);
  }
  }
  getDeptname(deptid)
  {
    return  this.departments.filter(dept => dept.departmentId === deptid)[0].departmentName;
  }
  removedepartment(dept){
    this.departmentarray = this.departmentarray.filter(depart => (depart != dept || depart == this.userDeptId));
  }
  get f() { return this.project.controls; }
}
