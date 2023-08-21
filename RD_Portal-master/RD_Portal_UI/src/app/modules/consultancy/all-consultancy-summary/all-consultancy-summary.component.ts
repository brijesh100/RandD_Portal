import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

@Component({
  selector: 'app-all-consultancy-summary',
  templateUrl: './all-consultancy-summary.component.html',
  styleUrls: ['./all-consultancy-summary.component.css']
})
export class AllConsultancySummaryComponent implements OnInit {

  allConsultancy : any;
  user: any;

  userId:string;
  userName : string;
  userIdName:string;

  consultancy:any;

  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const {userId,userDepartmentId,userName,userDesignation,userDesignationCode} = this.globalStore.getGlobalStore();
    this.userId = userId;
    this.userName = userName;
    this.userIdName = `${userId}-${userName}`;
    this.service.getConsultancyByUserId(this.userId).subscribe(consultancy =>{
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
                      "consultancyUpdatedAt" : consultancy.updatedAt,
              
                    })
      );
      this.consultancy = allconsultancy
      
    })


}

showUserOverview(userId){
  userId=userId.split('-')[0];
  this.service.getUserById(userId).subscribe(userdata =>{
    this.user = userdata;
  })
}

}
