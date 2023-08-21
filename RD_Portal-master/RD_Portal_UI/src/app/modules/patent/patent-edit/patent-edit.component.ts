import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';
import { RD_CONSTANT } from '../../../keys/constant';

@Component({
  selector: 'app-patent-edit',
  templateUrl: './patent-edit.component.html',
  styleUrls: ['./patent-edit.component.css']
})
export class PatentEditComponent implements OnInit {
  // Message strings
  successMessage: string;
  errorMessage: string;
  // Form group
  patent = new FormGroup({
    PatentYear: new FormControl('', Validators.required),
    PatentDepartment: new FormControl('', [Validators.required]),
    PatentTitle: new FormControl('', [Validators.required, Validators.minLength(5)]),
    PatentApplicationNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
    PatentInventors: new FormControl(''),
    PatentDate: new FormControl('', [Validators.required]),
    PublishedDate: new FormControl(''),
    FERDate: new FormControl(''),
    HearingDate: new FormControl(''),
    GrantedDate: new FormControl(''),
    searchedInventorId: new FormControl(''),
    otherPatentInventorId: new FormControl(''),
    status: new FormControl('', [Validators.required]),
    checks: new FormControl(''),
    GrantedPatentNumber: new FormControl(''),
    TechnologyReadinessLevel: new FormControl('',[Validators.required]),
  });
  departments: any;
  researchLabs: any;
  projectId: any;
  projectDetails: any;
  team: any = [];
  upfile: File;
  InventorIds: any = [];
  otherIns:any = [];
  userDepartment: any;
  usererror: any;
  other_cos: any = [];
  userIdName: string;
  patentDetails: any;
  patentIDNum:string;

  Stat:string;
  TRlevels:any=RD_CONSTANT.TRlevels;

  all_status: any = RD_CONSTANT.PATENT_STATUS;
  show_published_date: boolean = false;
  show_FER_date: boolean = false;
  show_hearing_date: boolean = false;
  show_granted_date: boolean = false;
  patentDetail: any;
  isloading: boolean;
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private router: Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const { userId, userName, userDepartmentId } = this.globalStore.getGlobalStore();
    console.log(this.all_status)
    this.service.getDepartments().subscribe(departments => {
      let allDepartments = departments.map(
        dept => ({ "departmentId": dept.departmentId, "departmentName": dept.departmentName })
      );
      this.departments = allDepartments;

    })
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = false;
      this.patentIDNum=params.patentId;
      this.service.getPatentById(params.patentId).subscribe(res => {
        console.log(res);
        this.patentDetail = res;
        
        this.patent.patchValue({
          'PatentYear': this.patentDetail.patentYear,
          'PatentDepartment': this.patentDetail.patentDepartment,
          'PatentTitle': this.patentDetail.patentTitle,
          'PatentApplicationNumber': this.patentDetail.patentApplicationNumber,
          'PatentInventors': this.patentDetail.patentInventors,
          'otherPatentInventors': this.patentDetail.otherPatentInventors,
          'PatentDate': this.changeDate(this.patentDetail.patentDate),
          'PublishedDate': this.changeDate(this.patentDetail.PublishedDate),
          'FERDate': this.changeDate(this.patentDetail.FERDate),
          'HearingDate': this.changeDate(this.patentDetail.HearingDate),
          'GrantedDate': this.changeDate(this.patentDetail.GrantedDate),
          'status': this.patentDetail.patentStatus,
          'GrantedPatentNumber': this.patentDetail.patentGrantNum,
          'TechnologyReadinessLevel':this.patentDetail.TechnologyReadinessLevel,

        })
        this.team = this.patentDetail.patentInventors,
        this.otherIns = this.patentDetail.otherPatentInventors,
        this.Stat = this.patentDetail.patentStatus
      })
    })
  }

  changeDate(dat){
    if(dat!= null) {
      const date = new Date(dat);
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      return year + '-' + month + '-' + day;
    }
    else{
      return null 
    }
  }

  removeInventorFromTeam(memberId) {
    this.team = this.team.filter(people => (people != memberId || people == this.userIdName));
  }

  searchInventorIds(searchId) {
    searchId = searchId.charAt(0).toUpperCase() + searchId.slice(1).toLowerCase()
    if (this.InventorIds.length === 0 || searchId !== this.InventorIds[0]) {
      this.service.getMatchingUserId(searchId).subscribe(userIds => {
        this.InventorIds = userIds;
      })
    }
  }

  addInventorToTeam(InventorId) {
    this.service.getUserById(InventorId.split('-')[0]).subscribe(user => {
      if(user){
        if (!this.team.includes(InventorId) &&
          InventorId != "" &&
          this.team.length <= RD_CONSTANT.MAX_CONTIBUTOR_PER_PROJECT) {
          this.team.push(InventorId);
          this.patent.patchValue({ searchedInventorId: "" });
        }
      }
    },error => {
      this.usererror = error + ". Please add in others section. ";
    });
  }

  clearInventorIdsDataList() {
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
  statusChange(value) {
    if (value == 'Published') {
      this.show_published_date = true;
      this.show_FER_date = false;
      this.show_hearing_date = false;
      this.show_granted_date = false;
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
    else if (value == 'FER Submitted') {
      this.show_published_date = true;
      this.show_FER_date = true;

      this.show_hearing_date = false;
      this.show_granted_date = false;

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
    else if (value == 'Hearing Completed') {
      this.show_published_date = true;
      this.show_FER_date = true;
      this.show_hearing_date = true;

      this.show_granted_date = false;
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
    else if (value == 'Granted') {
      this.show_published_date = true;
      this.show_FER_date = true;
      this.show_hearing_date = true;
      this.show_granted_date = true;

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
    else {
      this.show_published_date = false;
      this.show_FER_date = false;
      this.show_hearing_date = false;
      this.show_granted_date = false;
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
  getLabs(deptId) {
    this.researchLabs = this.departments.filter(dept => dept.departmentId === deptId)[0].researchLab;
  }
  updatePatent() {
    const patentDet = this.patent.value;
    const patenDetails = {
      patentYear: this.patent.value.PatentYear,
      patentDepartment: this.patent.value.PatentDepartment,
      patentTitle: this.patent.value.PatentTitle,
      patentApplicationNumber: this.patent.value.PatentApplicationNumber,
      patentDate: this.patent.value.PatentDate,
      PublishedDate: this.patent.value.PublishedDate,
      FERDate: this.patent.value.FERDate,
      HearingDate: this.patent.value.HearingDate,
      GrantedDate: this.patent.value.GrantedDate,
      patentInventors: this.team,
      otherPatentInventors: this.otherIns,
      patentStatus: patentDet.status,
      patentChecks: [],
      patentGrantNum: patentDet.GrantedPatentNumber,
      TechnologyReadinessLevel: patentDet.TechnologyReadinessLevel,

    }
    this.service.updatePatent(this.patentIDNum,patenDetails).subscribe(res => {
      this.router.navigate([`/patent/${this.patentIDNum}`]);
    })
  }

  clearMessage(){
    this.errorMessage = '';
    this.successMessage = '';
    this.usererror = '';
  }


}
