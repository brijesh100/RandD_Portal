import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';

import { RD_CONSTANT } from './../../../keys/constant';

@Component({
  selector: 'app-department-page',
  templateUrl: './department-page.component.html',
  styleUrls: ['./department-page.component.css']
})
export class DepartmentPageComponent implements OnInit{
  tempImgUrl = "https://img.favpng.com/20/20/1/market-research-marketing-competitor-analysis-quantitative-research-png-favpng-mamGg6Nes0HgSV8YUQJpTXSFh.jpg"
  department:any;
  researches:any;
  departmentSnapshot: any;
  dp:any;
  dpsnap:any;
  date:Date;
  constructor(private activatedRoute: ActivatedRoute, private service:ApiClientService){
  }

  ngOnInit(){
    this.activatedRoute.params.subscribe(params =>{
      this.dp=params
      this.service.getDepartments().subscribe( departments =>{
        this.department = departments.filter( dept => dept.departmentId === params.departmentId)[0];
        this.researches = this.department.researchLab;
   
      })
    var d=new Date;
  this.service.getDepartmentSnapshot().subscribe( response => {
    this.dpsnap = response.filter( dept => dept.departmentId === params.departmentId)[0];

    this.departmentSnapshot = [{
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.AFUNDINGS,
      tileCount:[this.dpsnap.appliedCount,this.dpsnap.appliedAmount]
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.RFUNDINGS,
      tileCount:[this.dpsnap.receivedCount,this.dpsnap.receivedAmount]
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PROJECTS,
      tileCount:[this.dpsnap.onGoingCount,this.dpsnap.completedCount]
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PUBLICATIONS,
      tileCount:[this.dpsnap.totalpubcount[d.getFullYear()],this.dpsnap.totalpubcount[d.getFullYear()-1]]
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.OTHER,
      tileCount:[this.researches.length,this.dpsnap.contributors]
    },
    {
      tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.MOUS,
      tileCount:['5+','5+']
    }
  ]
});
});

  }

}
