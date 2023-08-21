import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import{ RD_CONSTANT} from '../../../keys/constant';

import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../utils/project.utils';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';

@Component({
  selector: 'app-priority-project-form',
  templateUrl: './priority-project-form.component.html',
  styleUrls: ['./priority-project-form.component.css']
})
export class PriorityProjectFormComponent implements OnInit {
  lastDate = getYesterdayDate();
  project = new FormGroup({
    projectTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    projectSummary: new FormControl('',[Validators.required, Validators.minLength(10)]),
    projectDepartment: new FormControl('',[Validators.required]),
    projectLab: new FormControl(''),
    createdAt: new FormControl(this.lastDate),
    isOldProject: new FormControl(''),
    searchedContributorId: new FormControl(''),
    start: new FormControl('', [Validators.required]),
    end:new FormControl(''),

    patentCount: new FormControl(''),
    publicationCount: new FormControl(''),
    technologyReadinessLevel: new FormControl('',[Validators.required]),
    typedCollaborators: new FormControl('')
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
  TRlevels:any=RD_CONSTANT.TRlevels;
  collaborators:any = [];
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
      this.departmentarray = [];
    });
    
    this.userIdName = `${userId}-${userName}`;
    
    this.team = []; 
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
      if(res){
        if(!this.team.includes(contributorId) && 
          contributorId != "" && 
          this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT){
            this.team.push(contributorId);
            this.project.patchValue({searchedContributorId:""});
        }   
      }
    },error => {
      this.usererror = error + ". Please select from list ";
    });
  }

  removeContributorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  clearContributorIdsDataList(){
    this.contributorIds = [];
  }

  // Add collaborartos
  addCollaborator(collaboratorId){
    if(!this.collaborators.includes(collaboratorId) && collaboratorId != ""){
        this.collaborators.push(collaboratorId);
        this.project.patchValue({typedCollaborators:""});
    }   
  }
  removeCollaborator(memberId){
    this.collaborators = this.collaborators.filter(people => (people != memberId || people == this.userIdName));
  }

  clearCollaboratorDataList(){
    this.collaborators = [];
  }

  createProject(){
    if(this.departmentarray.length==0){
      this.errorMessage = "Please add atleast one department";
    }
    else{
      const {searchedContributorId, ...projectDetails } = this.project.value;
      projectDetails.team = filterUserId(this.team);
      projectDetails.projectDepartment =this.departmentarray;
      projectDetails.projectLab = ['Individual'];
      projectDetails.isOldProject=true;
      projectDetails.createdAt = getCreatedDate(projectDetails.createdAt, projectDetails.isOldProject);

      projectDetails.isPriority=true;
      let priority={
        principalInvestigator:projectDetails.team[0],
        coInvestigator:projectDetails.team.slice(1),
        collaborators:this.collaborators,
        technologyReadinessLevel:this.project.value.technologyReadinessLevel,
        patentCount:this.project.value.patentCount,
        publicationCount:this.project.value.publicationCount
      };
      projectDetails.priority=priority;
      projectDetails.approved=true;
      this.service.createNewProject(projectDetails).subscribe( response =>{
        this.clearMessage();
        this.project.reset();
        this.router.navigate([`/project/${response.projectId}`]);
        //this.team=[this.userIdName];
      },error=>{
        this.clearMessage();
        this.errorMessage = error;
      })
    }
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
    this.usererror = "";
  }
  addDepartment(dept){
    if(!this.departmentarray.includes(dept)){
    this.departmentarray.push(dept);
    if(this.departmentarray.length==1){
      this.getLabs(dept);
    }
  }
  }
  getDeptname(deptid)
  {
    return  this.departments.filter(dept => dept.departmentId === deptid)[0].departmentName;
  }
  removedepartment(dept){
    this.departmentarray = this.departmentarray.filter(depart => (depart != dept || depart == this.userDeptId));
  }
}

