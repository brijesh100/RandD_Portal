import { Component, OnInit } from '@angular/core';

import { ApiClientService } from '../../../service/api-client.service';
import { RD_CONSTANT } from './../../../keys/constant';
@Component({
  selector: 'app-all-publication-summary',
  templateUrl: './all-publication-summary.component.html',
  styleUrls: ['./all-publication-summary.component.css']
})
export class AllPublicationSummaryComponent implements OnInit {
  publications:any;
  publisherId:any;
  user:any;
  snapshot:any;
  searchText;
  departments:any;
  years:any=[];
  currentYear:any;
  unfiltered:any;
  allPublications:any;
  filterData={
    dept:'all',
    type:'all',
    indexing:'all',
    year:'all'
  };
  isloading:Boolean = true;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnInit(): void {
    console.log(this.allPublications);
    var currentYear=new Date();
    this.currentYear=currentYear.getFullYear();
    for(let i=this.currentYear-7;i<=this.currentYear;i++){
      this.years.push(i)
    }
    this.service.getOverAllSnapshot().subscribe(response=>{
      console.log(response);
      this.snapshot = [{
        tileName:RD_CONSTANT.SNAPSHOT_TILE.SCI,
        tileCount:response.publication.scicount[0]
      },

      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.SCOPUS,
        tileCount:response.publication.scopuscount[0]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.OTHERS,
        tileCount:response.publication.othercount[0]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.Publisher,
        tileCount:response.projects.researchLabs
      }
    ]
    })
    this.service.getAllPublicationsSummary().subscribe( publicationsSummary =>{
      this.allPublications = publicationsSummary.map(
        ({
          yearOfPublication,
          indexing,
          Department,
          publicationType,
          approved,
        }) =>
        ({
          yearOfPublication,
          indexing,
          Department:Department[0],
          publicationType,
          approved,
        }));
      this.publications = publicationsSummary.filter(pub=>pub.approved==true && pub.isarchived!=true);
      this.unfiltered=this.publications;
      this.isloading=false;
    })
    this.service.getDepartments().subscribe(res =>{
      this.departments=res.map(d => d.departmentId);
    })

    console.log(this.allPublications);

  }
  showUserOverview(userId){
    this.service.getUserById(userId).subscribe(userdata =>{
      this.user = userdata;
    })
  }
  filterFun(type,val){
    // this.filterData[type]=val.target.value;
    this.isloading=true;
    this.publications=this.unfiltered.filter(pub=>{
      if(this.filterData.dept!='all'){
        if(pub.Department[0]!=this.filterData.dept){
          return false
        }
      }
      if(this.filterData.indexing!='all'){
        if(pub.indexing!=this.filterData.indexing){
          return false
        }
      }
      if(this.filterData.type!='all'){
        if(pub.publicationType!=this.filterData.type){
          return false
        }
      }
      if(this.filterData.year!='all'){
        if(pub.yearOfPublication.slice(0,4)!=this.filterData.year){
          return false
        }
      }
      return true
    })
    this.isloading=false;
  }
  reset(){
    this.isloading=true;
    this.filterData={
      dept:'all',
      type:'all',
      indexing:'all',
      year:'all'
    }
    this.publications=this.unfiltered;
    this.isloading=false;
  }
}





