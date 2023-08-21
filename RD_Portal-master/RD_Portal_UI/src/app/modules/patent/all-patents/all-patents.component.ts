import { filter } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';
import { RD_CONSTANT } from './../../../keys/constant';
import {isUserWithProfile, hasAdminAccess} from './../../../utils/project.utils';
@Component({
  selector: 'app-all-patents',
  templateUrl: './all-patents.component.html',
  styleUrls: ['./all-patents.component.css']
})
export class AllPatentsComponent implements OnInit {

  patent: any;
  allPatents : any;
  patentStatus: any;
  user: any;
  searchText;
  isadmin:any;
  snapshot:any;
  procount:any;
  isloading:boolean=true;
  darktheme: string;
  year: any;
  date: Date=new Date();
  departId: any;
  allPatentDetails:any;
  TRlevelText = RD_CONSTANT.TRlevelText;
  TRlevelBadge = RD_CONSTANT.TRlevelsColor;
  TRlevelContent = RD_CONSTANT.TRlevelContent;
  TRlevels = RD_CONSTANT.TRlevels;
  unfiltered:any;
  departments:any;
  filterData={
    dept:'all',
    trl:'all',
    year:'all'
  };
  years: any=[];

  constructor(
    private service: ApiClientService,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();
    this.darktheme=darktheme;
    this.year=this.date.getFullYear();
    // Get departemnts for filter
    this.service.getDepartments().subscribe(res =>{
      this.departId=res;
      this.departments=res.map(dep=>dep.departmentId);

    });


    // Year array for filter
    for(let i=this.year-7;i<=this.year;i++){
      this.years.push(i)
    }

    this.service.getOverAllSnapshot().subscribe(response=>{
      console.log(response);
     this.snapshot = [
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.TotPatent,
        tileCount:response.patent.totalCount,
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.GrantPatent,
        tileCount:response.patent.grantedpat[0],
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.PubPatent,
        tileCount:response.patent.pubpat[0],
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.ferSub,
        tileCount:response.patent.ferSub[0],
      }
      ]
      this.isloading=false;
    })
    this.service.getallPatents().subscribe(patentSummary => {
      this.allPatents=patentSummary.map(
        ({
          patentYear,
          patentDepartment,
          patentStatus,
          patentId,
          TechnologyReadinessLevel,
          patentInventors,
          patentTitle,
          patentDate

        }) =>
        ({
          patentYear,
          patentDepartment:patentDepartment[0],
          patentStatus,
          patentId,
          TechnologyReadinessLevel,
          patentInventors,
          patentTitle,
          patentDate

        })
      );
      this.patent = patentSummary.filter(pat=>pat.patentId);
      this.unfiltered = this.patent
      this.isloading=false;

      console.log(this.allPatents);


    })
  }
  showUserOverview(userId){
    console.log(userId)
    userId=userId.split('-')[0];
    console.log(userId)
    this.service.getUserById(userId).subscribe(userdata =>{
      console.log(userdata)
      this.user = userdata;
    })
  }
  filterFun(type,val){
    this.isloading=true;
    this.patent=this.unfiltered.filter(pat=>{
      if(this.filterData.dept!='all'){
        if(pat.patentDepartment[0]!=this.filterData.dept){
          return false
        }
      }

      if(this.filterData.trl!='all'){
  if(pat.TechnologyReadinessLevel!=this.filterData.trl){
    return false
  }
}
      if(this.filterData.year!='all'){
        let date = new Date(pat.patentYear);
        if(date.getFullYear() != Number(this.filterData.year)){
          return false
        }
      }
      return true
    })
  }
  reset(){
    this.filterData={
      dept:'all',
      trl:'all',
      year:'all'
    }
    this.patent=this.unfiltered;
    this.isloading=false;
  }

}
