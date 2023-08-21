import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import{ RD_CONSTANT} from '../../../keys/constant';
import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../utils/project.utils';
import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-patent-form',
  templateUrl: './patent-form.component.html',
  styleUrls: ['./patent-form.component.css']
})
export class PatentFormComponent implements OnInit {


  isloading: boolean= true;
  // Message strings
  successMessage:string;
  errorMessage:string;
  // Form group
  patent = new FormGroup({
    PatentYear: new FormControl('',Validators.required),
    PatentDepartment: new FormControl('',[Validators.required]),
    PatentTitle: new FormControl('',[Validators.required, Validators.minLength(5)]),
    PatentApplicationNumber:new FormControl('',[Validators.required, Validators.minLength(5)]),
    PatentInventors: new FormControl(''),
    otherPatentInventors: new FormControl(''),
    PatentDate: new FormControl('', [Validators.required]),
    PublishedDate: new FormControl(''),
    FERDate: new FormControl(''),
    HearingDate: new FormControl(''),
    GrantedDate: new FormControl(''),
    searchedInventorId: new FormControl(''),
    otherPatentInventorId: new FormControl(''),
    status:new FormControl('',[Validators.required]),
    checks:new FormControl(''),
    GrantedPatentNumber:  new FormControl(''),
    TechnologyReadinessLevel: new FormControl('',[Validators.required]),
  });
  departments:any;
  researchLabs:any;
  projectId: any;
  projectDetails: any;
  team:any=[];
  upfile:File;
  InventorIds:any = [];
  otherIns:any = [];
  userDepartment:any;
  usererror: any;
  userIdName:string;
  patentDetails: any;

  all_status:any=RD_CONSTANT.PATENT_STATUS;
  show_published_date: boolean =false;
  show_FER_date: boolean=false;
  show_hearing_date: boolean=false;
  show_granted_date: boolean=false;
  TRlevels:any=RD_CONSTANT.TRlevels;
  constructor(
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router,
    private fb:FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {userId,userName,userDepartmentId} = this.globalStore.getGlobalStore();
    console.log(this.all_status)
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
      
    })
  
  }
  
   
  removeInventorFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  searchInventorIds(searchId){
    searchId=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if( this.InventorIds.length === 0 || searchId !== this.InventorIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.InventorIds = userIds;
      })
    } 
  }

  addInventorToTeam(InventorId){
    this.service.getUserById(InventorId.split('-')[0]).subscribe(res=>{
    if(res){
     if(!this.team.includes(InventorId) && 
     InventorId != "" && 
     this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT)
      {
        this.team.push(InventorId);
        this.patent.patchValue({searchedInventorId:""});
      }  
      } 
    },error => {
    this.usererror = error + ". Please add in others section. ";
  });
  }

  clearInventorIdsDataList(){
    this.InventorIds = [];
  }

  addOtherInventorToTeam(InventorId){
     if(!this.otherIns.includes(InventorId) && 
        InventorId != "" && 
        this.otherIns.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT)
        {
          this.otherIns.push(InventorId);
          this.patent.patchValue({otherPatentInventorId:""});
        }  
  }
  removeOtherInventorFromTeam(memberId){
    this.otherIns = this.otherIns.filter(people => (people != memberId || people == this.userIdName));
  }
  clearOtherInventorIdsDataList(){
    this.otherIns = [];
  }


  statusChange(value){
    if(value=='Published'){
      this.show_published_date=true;
      this.show_FER_date=false;
      this.show_hearing_date=false;
      this.show_granted_date=false;
      // Form update
      this.patent.controls['PublishedDate'].setValidators([Validators.required]);
      this.patent.controls['PublishedDate'].updateValueAndValidity();
      this.patent.controls['FERDate'].clearValidators();
      this.patent.controls['FERDate'].updateValueAndValidity();
      this.patent.controls['HearingDate'].clearValidators();
      this.patent.controls['HearingDate'].updateValueAndValidity();
      this.patent.controls['GrantedDate'].clearValidators();
      this.patent.controls['GrantedDate'].updateValueAndValidity();
      this.patent.controls['GrantedPatentNumber'].clearValidators();
      this.patent.controls['GrantedPatentNumber'].updateValueAndValidity();
    }
    else if(value=='FER Submitted'){
      this.show_published_date=true;
      this.show_FER_date=true;

      this.show_hearing_date=false;
      this.show_granted_date=false;

      // Form update
      this.patent.controls['PublishedDate'].setValidators([Validators.required]);
      this.patent.controls['PublishedDate'].updateValueAndValidity();
      this.patent.controls['FERDate'].setValidators([Validators.required]);
      this.patent.controls['FERDate'].updateValueAndValidity();
      this.patent.controls['HearingDate'].clearValidators();
      this.patent.controls['HearingDate'].updateValueAndValidity();
      this.patent.controls['GrantedDate'].clearValidators();
      this.patent.controls['GrantedDate'].updateValueAndValidity();
      this.patent.controls['GrantedPatentNumber'].clearValidators();
      this.patent.controls['GrantedPatentNumber'].updateValueAndValidity();
    }
    else if(value=='Hearing Completed'){
      this.show_published_date=true;
      this.show_FER_date=true;
      this.show_hearing_date=true;

      this.show_granted_date=false;
      // Form update
      this.patent.controls['PublishedDate'].setValidators([Validators.required]);
      this.patent.controls['PublishedDate'].updateValueAndValidity();
      this.patent.controls['FERDate'].setValidators([Validators.required]);
      this.patent.controls['FERDate'].updateValueAndValidity();
      this.patent.controls['HearingDate'].setValidators([Validators.required]);
      this.patent.controls['HearingDate'].updateValueAndValidity();
      this.patent.controls['GrantedDate'].clearValidators();
      this.patent.controls['GrantedDate'].updateValueAndValidity();
      this.patent.controls['GrantedPatentNumber'].clearValidators();
      this.patent.controls['GrantedPatentNumber'].updateValueAndValidity();
    }
    else if(value=='Granted'){
      this.show_published_date=true;
      this.show_FER_date=true;
      this.show_hearing_date=true;
      this.show_granted_date=true;

      // Form update
      this.patent.controls['PublishedDate'].setValidators([Validators.required]);
      this.patent.controls['PublishedDate'].updateValueAndValidity();
      this.patent.controls['FERDate'].setValidators([Validators.required]);
      this.patent.controls['FERDate'].updateValueAndValidity();
      this.patent.controls['HearingDate'].setValidators([Validators.required]);
      this.patent.controls['HearingDate'].updateValueAndValidity();
      this.patent.controls['GrantedDate'].setValidators([Validators.required]);
      this.patent.controls['GrantedDate'].updateValueAndValidity();
      this.patent.controls['GrantedPatentNumber'].setValidators([Validators.required]);
      this.patent.controls['GrantedPatentNumber'].updateValueAndValidity();
    }
    else{
      this.show_published_date=false;
      this.show_FER_date=false;
      this.show_hearing_date=false;
      this.show_granted_date=false;
      // Form update
      this.patent.controls['PublishedDate'].clearValidators();
      this.patent.controls['PublishedDate'].updateValueAndValidity();
      this.patent.controls['FERDate'].clearValidators();
      this.patent.controls['FERDate'].updateValueAndValidity();
      this.patent.controls['HearingDate'].clearValidators();
      this.patent.controls['HearingDate'].updateValueAndValidity();
      this.patent.controls['GrantedDate'].clearValidators();
      this.patent.controls['GrantedDate'].updateValueAndValidity();
      this.patent.controls['GrantedPatentNumber'].clearValidators();
      this.patent.controls['GrantedPatentNumber'].updateValueAndValidity();
    }
  }
  getLabs(deptId){
    this.researchLabs= this.departments.filter(dept => dept.departmentId === deptId)[0].researchLab;
  }
  createPatent()
  {
    const patentDet = this.patent.value;
    const patenDetails = {
      patentYear : this.patent.value.PatentYear,
      patentDepartment : this.patent.value.PatentDepartment,
      patentTitle : this.patent.value.PatentTitle,
      patentApplicationNumber: this.patent.value.PatentApplicationNumber,
      patentDate : this.patent.value.PatentDate,
      PublishedDate : this.patent.value.PublishedDate,
      FERDate : this.patent.value.FERDate,
      HearingDate : this.patent.value.HearingDate,
      GrantedDate : this.patent.value.GrantedDate,
      patentInventors:this.team,
      otherPatentInventors:this.otherIns,
      patentStatus:patentDet.status,
      patentChecks:[],
      patentGrantNum:patentDet.GrantedPatentNumber,
      TechnologyReadinessLevel:this.patent.value.TechnologyReadinessLevel,
    }
    this.service.addPatent(patenDetails).subscribe(res=>{
      this.router.navigate([`/patent/${res.patentId}`]);
    })
  }

  clearMessage(){
    this.successMessage = "";
    this.errorMessage = "";
    this.usererror="";
  }

}


// old reference
//   this.activatedRoute.params.subscribe(params =>{
  //     this.projectId = params.projectId;

      
  //     this.userIdName = `${userId}-${userName}`;
  //     this.team = [this.userIdName]; 
 
  //   this.service.getProjectById(this.projectId).subscribe(res=>{
  //     this.projectDetails=res;
  //     this.isloading=false;
  //     this.team=this.projectDetails.team;
  //   });
  // });
  // let fundingDetails = this.patent.value;
  // console.log(fundingDetails.checks);
  // console.log(fundingDetails.status);
