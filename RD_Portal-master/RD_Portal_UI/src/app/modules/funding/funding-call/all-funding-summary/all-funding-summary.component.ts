import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';

@Component({
  selector: 'app-all-funding-summary',
  templateUrl: './all-funding-summary.component.html',
  styleUrls: ['./all-funding-summary.component.css']
})
export class AllFundingSummaryComponent implements OnInit {
  fundings: any;
  status:String;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnInit(): void {
    this.service.getAllFundingsSummary().subscribe( fundingsSummary =>{
      this.fundings = fundingsSummary;
    })
  }


}
