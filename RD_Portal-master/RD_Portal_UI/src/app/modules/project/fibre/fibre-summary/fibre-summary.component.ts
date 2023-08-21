import { Component, OnInit } from '@angular/core';

import { ApiClientService } from 'src/app/service/api-client.service';
import { RD_CONSTANT } from 'src/app/keys/constant';

@Component({
  selector: 'app-fibre-summary',
  templateUrl: './fibre-summary.component.html',
  styleUrls: ['./fibre-summary.component.css']
})
export class FibreSummaryComponent implements OnInit {

  constructor( private service : ApiClientService ) { }

  selectedTRL: String='';
  selectedStatus: String = '';

  allPriorityProjects:any;
  priorityProjects:any;
  searchText:string;
  TRL=RD_CONSTANT.TRlevels;

  ngOnInit(): void {
    this.service.getPriorityProjects().subscribe(projects =>{
      this.allPriorityProjects = projects;
      this.priorityProjects = this.allPriorityProjects;
    });
  }
  filter(){
    if(this.selectedTRL == ''){
      this.priorityProjects = this.allPriorityProjects.filter(project => project.priority.status == this.selectedStatus);
    }
    else if(this.selectedStatus == ''){
      this.priorityProjects = this.allPriorityProjects.filter(project => project.priority.technologyReadinessLevel == this.selectedTRL);
    }
    else{
      this.priorityProjects = this.allPriorityProjects.filter(project => project.priority.technologyReadinessLevel == this.selectedTRL && project.priority.status == this.selectedStatus);
    }
  }

  reset(){
    this.selectedTRL = '';
    this.selectedStatus = '';
    this.ngOnInit();
  }

}
