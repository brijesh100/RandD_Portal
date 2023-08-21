import { Component, OnInit } from '@angular/core';

import { GlobalStoreService } from './../../../service/global-store.service';
import { ApiClientService } from '../../../service/api-client.service';
import {getCreateProjectAccess} from '../../../utils/project.utils';
import { FormBuilder,FormGroup, FormControl,Validators} from '@angular/forms';
import { RD_CONSTANT } from '../../../keys/constant'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  projects:any;
  publications:any;
  fundingProjects:any;
  consultancy:any;
  patent:any;

  userId:string;
  userName : string;
  userIdName:string;
  departmentId:string;
  designation:string;
  createAccess:boolean;
  receivedfundings:any;
  researchlab:any;
  notifications: any;
  rejectedfundings: any;
  showcontact: boolean;
  userData:any;
  phonenumber:string;
  Email:string;
  userForm = new FormGroup({
    phoneNumber: new FormControl('',[Validators.required, Validators.minLength(5)]),
    email: new FormControl('',[Validators.required, Validators.minLength(3)]),
  });
  constructor(private service:ApiClientService, private globalStore: GlobalStoreService,private fb: FormBuilder) { }

  ngOnInit(): void {
    const {userId,userDepartmentId,userName,userDesignation,userDesignationCode} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.userIdName = `${userId}-${userName}`;
    this.departmentId = userDepartmentId;
    this.designation =RD_CONSTANT.USER_DESIGNATION_MAP["PROFR"] ;
    this.service.getUserById(this.userId).subscribe(userData=>{
      this.userData=userData;
      this.Email=userData.details.email;
      this.researchlab=userData.details.lab;
      this.phonenumber=userData.details.phoneNumber;
      this.userForm = this.fb.group({
        phoneNumber:[this.phonenumber],
        email:[this.Email]
      });
    })
    this.service.getProjectByUserId(this.userId).subscribe(projects =>{
      let allProjects = projects.map(
          project => ({"projectId" : project.projectId, 
                      "projectTitle" :project.projectTitle,
                      "status" : RD_CONSTANT.PROJECT_STATUS_MAP[project.status],
                      "createdAt": project.createdAt,
                      "review":project.review,
                      "approved":project.approved,
                      "isarchived":project.isarchived
                    })
      );
      this.projects = allProjects.filter(project => project.isarchived==false);
      
    })

    this.service.getPublicationsByUserId(this.userId).subscribe(publications =>{
      let allPublications = publications.map(
        publication => ({"publicationId" : publication.publicationId, 
                      "publicationType" :publication.publicationType,
                      "publicationName" :publication.publicationName,
                      "paperTitle": publication.paperTitle,
                      "yearOfPublication": publication.yearOfPublication,
                      "isarchived":publication.isarchived
                    })
      );
      this.publications = allPublications.filter(pub => pub.isarchived==false);
    })


    //////////////Consultancy/////////////////
    this.service.getConsultancyByUserId(this.userId).subscribe(consultancy =>{
      console.log(consultancy)
      let allconsultancy = consultancy.map(
        consultancy => ({"consultancyId" : consultancy.consultancyId, 
                      "consultancyTitle" :consultancy.consultancyTitle,
                      "consultancyStatus" : consultancy.consultancyStatus,
                      "consultancyType" : consultancy.consultancyType,
                      "consultancyIndustry" : consultancy.consultancyIndustry,
                      "consultancyInvoiceNumber" : consultancy.consultancyInvoiceNumber,
                      "consultancyReceiptNumber" : consultancy.consultancyReceiptNumber,
                      "consultancyReceiptCost" : consultancy.consultancyReceiptCost,
                      "consultancyTesting" : consultancy.consultancyTesting,
                      "consultancyReceiptDate" : consultancy.consultancyReceiptDate,
                      "consultancyTeam" : consultancy.consultancyTeam,
                      "consultancyDepartment" : consultancy.consultancyDepartment,
              
                    })
      );
      this.consultancy = allconsultancy
      
    })


    this.service.getPatentByUserId(this.userIdName).subscribe(patent =>{
      console.log(patent)
      let allpatent = patent.map(
        patent => ({
                      "patentId"  : patent.patentId, 
                      "patentInventors" : patent.patentInventors,
                      "patentYear" : patent.patentYear,
                      "patentDepartment" : patent.patentDepartment,
                      "patentTitle" : patent.patentTitle,
                      "patentApplicationNumber" : patent.patentApplicationNumber,
                      "patentDate" : patent.patentDate,
                      "PublishedDate" : patent.PublishedDate,
                      "patentFERDate" : patent.patentFERDate,
                      "patentHearingDate" : patent.patentHearingDate,
                      "patentGrantedDate" : patent.patentGrantedDate,
                      "patentStatus" : patent.patentStatus,
                      "patentGrantNum" : patent.patentGrantNum,
                    })
      );
      this.patent = allpatent
      
    })
    
    
    this.service.getFundingProjectByUserId(this.userId).subscribe(fundingProjects =>{
      let allFundingProjects = fundingProjects.map(
        fundingProject => ({"fundingProjectId" : fundingProject.fundingProjectId, 
                      "fundingType" :fundingProject.fundingType.split(" ")[0],
                      "status" :  RD_CONSTANT.FUNDING_STATUS_MAP[fundingProject.status],
                      "nameOfGrant": fundingProject.nameOfGrant,
                      "isExternal": fundingProject.isExternal,
                      "fundingOrganisation":fundingProject.fundingOrganisation,
                      "fundingamount":fundingProject.fundingAmount
                     
                    })
        );
      this.receivedfundings=allFundingProjects.filter(projects => projects.status==='Accepted')
      this.fundingProjects = allFundingProjects.filter(projects => projects.status!=='Accepted' && projects.status!=='Rejected');
      this.rejectedfundings=allFundingProjects.filter(projects => projects.status==='Rejected')
      //this.fundingProjects.push(this.rejectedfundings)
    })
    this.getNotifications();
    this.createAccess = getCreateProjectAccess(userDesignationCode);
  }
  showContact()
  {
    this.showcontact=true;
  }
  cancel()
  {
    this.showcontact=false;
  }
  refresh()
  {
    //this.modalmessage="User Edited Successfully";
    location.reload()
   
  }
  updateuser()
  {
    let userDetails = this.userForm.value;
    this.service.addContact(userDetails,this.userId).subscribe(response =>{
      this.userForm.reset();
      this.refresh();
      this.userForm.reset();
    },
    error=>{
    })
  }
  getNotifications(){
    this.service.getUserNotifications(this.userId).subscribe(res=>{
      this.notifications=res
    })
  }
  readMessage(id)
  {
    this.service.readUserNotifications(id).subscribe(res=>{
    })
  }
}