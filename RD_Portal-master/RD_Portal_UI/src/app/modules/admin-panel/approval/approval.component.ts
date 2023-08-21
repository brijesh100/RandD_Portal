import { Component, OnInit } from '@angular/core';
import {ApiClientService} from '../../../service/api-client.service';

import { RD_CONSTANT } from '../../../keys/constant';
@Component({
  selector: 'app-approval',
  templateUrl: './approval.component.html',
  styleUrls: ['./approval.component.css']
})
export class ApprovalComponent implements OnInit {

  departmentSnapshot: any;
  overAllSnapshot:any;
  approvals:any;
  publicationl:any;
  approvalprojectscount:any;
  approvalfundingcount: any;
  fapprovals: any;
  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
    
    this.service.getDepartmentSnapshot().subscribe( response => {
        this.departmentSnapshot = response;
    });

  }
    

}
