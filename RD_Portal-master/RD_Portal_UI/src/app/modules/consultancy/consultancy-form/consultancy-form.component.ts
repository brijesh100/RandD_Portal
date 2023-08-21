import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import{ RD_CONSTANT} from '../../../keys/constant';
import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../utils/project.utils';
import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from './../../../service/api-client.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-consultancy-form',
  templateUrl: './consultancy-form.component.html',
  styleUrls: ['./consultancy-form.component.css']
})
export class ConsultancyFormComponent implements OnInit {

  isloading: boolean= true;
  // Message strings
  successMessage:string;
  errorMessage:string;
  // Form group
 consult = new FormGroup({
  consultancyType: new FormControl('',Validators.required),

  });

  ConsultancyJobWork = new FormGroup({
    searchedTeamMemberId: new FormControl(''),
    consultancyTitle: new FormControl(''),   
    consultancyDepartment: new FormControl('',[Validators.required]),
    consultancyIndustry: new FormControl('',[Validators.required]),
    consultancyInvoiceNumber: new FormControl('',[Validators.required]),
    consultancyReceiptNumber: new FormControl('',[Validators.required]),
    consultancyReceiptcost: new FormControl('',[Validators.required]),
    consultancyStatus:new FormControl('',[Validators.required]),
    consultancyTesting: new FormControl(''),   
    consultancyReceiptDate: new FormControl(''),
    });

  departments:any;
  team:any=[];
  userIdName:string;
  TeamMemberIds:any = [];
  userId:string;
  userName : string;
  departmentId:string;


  show_Job_Work: boolean=false;
  show_Test_Service: boolean=false;
  
  constructor(
    private service:ApiClientService,
    private globalStore :GlobalStoreService,
    private router:Router,
    private fb:FormBuilder,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const {userId,userName,userDepartmentId} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.departmentId = userDepartmentId;
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
      
    })

    this.userIdName = `${userId}-${userName}`;
    this.team = [this.userIdName];
  
  }
  TypeChange(){
    this.ConsultancyJobWork.reset();
    if(this.consult.value.consultancyType=="JobWorkServices"){
      this.show_Job_Work=true
      this.show_Test_Service=false


      this.ConsultancyJobWork.controls['consultancyTitle'].setValidators([Validators.required]);
      this.ConsultancyJobWork.controls['consultancyTitle'].updateValueAndValidity();
    }
    else{
      this.show_Job_Work=false
      this.show_Test_Service=true

      this.ConsultancyJobWork.controls['consultancyTesting'].setValidators([Validators.required]);
      this.ConsultancyJobWork.controls['consultancyTesting'].updateValueAndValidity();
      this.ConsultancyJobWork.controls['consultancyReceiptDate'].setValidators([Validators.required]);
      this.ConsultancyJobWork.controls['consultancyReceiptDate'].updateValueAndValidity();
    }
  }

  createconsultancy(){
    const Consultancy ={
      userId:this.userId,
      consultancyDepartment:this.ConsultancyJobWork.value.consultancyDepartment,
      consultancyTitle:this.ConsultancyJobWork.value.consultancyTitle,
      consultancyType:this.consult.value.consultancyType,
      consultancyIndustry:this.ConsultancyJobWork.value.consultancyIndustry,
      consultancyInvoiceNumber:this.ConsultancyJobWork.value.consultancyInvoiceNumber,
      consultancyReceiptNumber:this.ConsultancyJobWork.value.consultancyReceiptNumber,
      consultancyReceiptcost:this.ConsultancyJobWork.value.consultancyReceiptcost,
      consultancyStatus:this.ConsultancyJobWork.value.consultancyStatus,
      consultancyTeam:this.team,
      consultancyTesting:this.ConsultancyJobWork.value.consultancyTesting,
      consultancyReceiptDate:this.ConsultancyJobWork.value.consultancyReceiptDate,
    }

    this.service.addConsultancy(Consultancy).subscribe(res=>{
      this.router.navigate([`/consultancy//${res.consultancyId}`]);
    })

  }


  removeTeamMemberFromTeam(memberId){
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  searchTeamMemberIds(searchId){
    searchId=searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if( this.TeamMemberIds.length === 0 || searchId !== this.TeamMemberIds[0]){
      this.service.getMatchingUserId(searchId).subscribe(userIds=>{
        this.TeamMemberIds = userIds;
      })
    } 
  }

  addTeamMemberToTeam(TeamMemberId){
    if(!this.team.includes(TeamMemberId) && 
      TeamMemberId != "" && 
      this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT){
        this.team.push(TeamMemberId);
        this.ConsultancyJobWork.patchValue({searchedTeamMemberId:""});
    }   
  }

  clearTeamMemberIdsDataList(){
    this.TeamMemberIds = [];
  }

}
