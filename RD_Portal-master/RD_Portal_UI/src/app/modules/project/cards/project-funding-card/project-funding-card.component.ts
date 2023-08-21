import { Component,  Input, OnChanges, OnInit } from '@angular/core';

import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-project-funding-card',
  templateUrl: './project-funding-card.component.html',
  styleUrls: ['./project-funding-card.component.css']
})
export class ProjectFundingCardComponent implements OnChanges {
  @Input() fundingProjects:any;  
  hasfund:boolean =true;
  constructor() { }

  ngOnChanges(): void {

    if(this.fundingProjects)
    {
      this.hasfund=true;
    }
    else{
      this.hasfund=false;
    }
    
  }

}
