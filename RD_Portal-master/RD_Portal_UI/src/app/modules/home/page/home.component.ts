import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color,SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import {ApiClientService} from '../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';
import { RD_CONSTANT } from '../../../keys/constant';
import { AutoLogoutService } from 'src/app/service/auto-logout';
import { hasAdminAccess } from 'src/app/utils/project.utils';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  departmentSnapshot: any;
  overAllSnapshot:any;
  publicationl:any;
  date: Date=new Date();
  year:any;
  userDetails:any;
  @ViewChild('launchModal') launchModal;
  // ------Line Chart Variables------
  years:any;
  publication_counts_year:any;

  darktheme:boolean;

  //--------bar chart-------------
  public barChartOptions: ChartOptions = {
    responsive: true,
    
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] 
  public ChartColors: Color[] = [
    { backgroundColor: 'rgba(90, 165, 255,0.5)',borderColor: 'black', },
    { backgroundColor: 'rgba(87, 165, 255,1.0)',borderColor: 'black', },
    { backgroundColor: 'rgba(52, 201, 122,0.5)',borderColor: 'black', },
    { backgroundColor: 'rgba(52, 201, 122,1.0)',borderColor: 'black', },
    { backgroundColor: 'rgba(255, 190, 99,0.5)',borderColor: 'black', },
    { backgroundColor: 'rgba(255, 190, 99,1.0)',borderColor: 'black', },
    { backgroundColor: 'rgba(87, 165, 255,1.0)',borderColor: 'black', },
    { backgroundColor: 'rgba(52, 201, 122,0.5)',borderColor: 'black', },
    { backgroundColor: 'rgba(255, 190, 99,1.0)',borderColor: 'black', },
  ]

  // ------------PIE CHART----------------
  public pieChartOptions: ChartOptions = {
    title:{
      text:"Publication Type",
      display:true
    },
    legend:{position:'left',
    },
    responsive: true,
  };
  public pieChartLabels: Label[] = ['SCI','SCOPUS','Others'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array < any > = [{
    backgroundColor: ['rgba(87, 165, 255,0.9)', 'rgba(59, 184, 111,0.9)', 'rgba(255, 190, 99,0.9)']
 }];



  // ----------------LINE CHART-------------
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[];
  
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(59, 184, 111,0.9)',
      backgroundColor: 'rgba(59, 184, 111,0)',
    },
    {
      backgroundColor: 'rgba(153,153,239,0)',
      borderColor: 'rgba(153, 153, 239,0.9)',
    },
    {
      borderColor: '#ffbe63',
      backgroundColor: 'rgba(255,197,116,0)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public lineChartOptions: ChartOptions = {
    title:{
      display:true
    },
    responsive: true,
  };

  //Horizontal Bar Chart 
  public hbarChartOptions: ChartOptions = {
    responsive: true
  };
  public hbarChartType: ChartType = 'horizontalBar';
  public hbarChartLegend = true;

  public hbarChartData: ChartDataSets[]
  

  isgraph: boolean;
  ispieset:boolean;
  deptpub: any;
  deptpro: any;
  deptfun: any;
  funding_count_year: any[];
  pyears: any[];
  departnames: any;
  lineChartLabels2: any;
  constructor(
    private service: ApiClientService,
    private autoLogout: AutoLogoutService,private globalStore: GlobalStoreService
    ) { }

  ngOnInit(): void {

    const {darktheme,userId}=this.globalStore.getGlobalStore();
    // Check if user has entered details or not 
    this.service.getUserById(userId).subscribe(res=>{
      this.userDetails=res;
      if((res.details==undefined || res.details.email=='') && (hasAdminAccess(res.userDesignationCode)==false)){
        this.launchModal.nativeElement.click();
      }
    });

    // let date:Date=new Date();
    this.year=this.date.getFullYear()
    if(darktheme=='true')
    {
      this.darktheme=true;
      this.barChartOptions={
        responsive: true,
        legend:{
        labels: {
          fontColor: 'rgb(255,255,255)', 
        }
        },
        scales: {
          xAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }],
          yAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }]
        }}
        this.pieChartOptions={
          title:{
            text:"Publication Type",
            fontColor: 'rgb(255,255,255)', 
            display:true
          },
          legend:{position:'left',
          labels: {
            fontColor: 'rgb(255,255,255)', 
          }
          },
          responsive: true,
        }
        this.lineChartOptions={
          title:{
            fontColor: 'rgb(255,255,255)', 
            display:true
          },
          scales: {
            xAxes: [{
              ticks: { fontColor: 'white' },
              gridLines: { color: 'rgba(255,255,255,0.1)' }
            }],
            yAxes: [{
              ticks: { fontColor: 'white' },
              gridLines: { color: 'rgba(255,255,255,0.1)' }
            }]
          },
          legend:{
          labels: {
            fontColor: 'rgb(255,255,255)', 
          }
          },
          responsive: true,
        }
        this.pieChartColors= [{
          backgroundColor: ['rgba(87, 165, 255,0.9)', 'rgba(59, 184, 111,0.9)', 'rgba(255, 190, 99,0.9)'],borderColor: '#333333'
       }];
    }
    else{this.darktheme=false}
    
    this.service.getDepartmentSnapshot().subscribe( response => {
        this.departmentSnapshot = response;
        
      //Bar chart Data 
        this.deptpro=[response.map(a=> a.barchartdata[2]),response.map(a=> a.barchartdata[3])];
        this.deptpub=[response.map(a=> a.barchartdata[4]),response.map(a=> a.barchartdata[5])];
        this.deptfun=[response.map(a=> a.barchartdata[0]),response.map(a=> a.barchartdata[1])];
        this.departnames=response.map(a=>a.departmentId)
        //========use this if stack needed
        // this.barChartData=[
        // { data: this.deptfun[0], label: 'Fundings '+(this.year-1), stack:'b' },
        // { data: this.deptfun[1], label: 'Fundings '+this.year , stack:'a'},
        // { data: this.deptpro[0], label: 'Projects '+(this.year-1), stack:'b' },                    
        // { data: this.deptpro[1], label: 'Projects '+(this.year), stack:'a'  },                    
        // { data: this.deptpub[0], label: 'Publications '+(this.year-1), stack:'b'  },
        // { data: this.deptpub[1], label: 'Publications '+(this.year) , stack:'a' }];
        this.barChartData=[
          { data: this.deptfun[0], label: 'Fundings '+(this.year-1)+'-'+(this.year%100)},
          { data: this.deptfun[1], label: 'Fundings '+this.year+'-'+((this.year+1)%100) },
          { data: this.deptpro[0], label: 'Projects '+(this.year-1)+'-'+(this.year%100) },                    
          { data: this.deptpro[1], label: 'Projects '+(this.year)+'-'+((this.year+1)%100)},                    
          { data: this.deptpub[0], label: 'Publications '+(this.year-1)+'-'+(this.year%100) },
          { data: this.deptpub[1], label: 'Publications '+(this.year)+'-'+((this.year+1)%100)  }];
        console.log(this.departnames)
        this.barChartLabels=this.departnames

      //Department Line chart Data 
      // response.linedata={response.totalrocount}
      // let project_ar=[]
      this.years=[this.year-2,this.year-1,this.year];
      // for(year in response.publication.totalcount)
      // {
      //   this.years.push(year);
      // }
      this.lineChartLabels=this.years;
      for(var i=0;i<response.length;i++){
        response[i].linechartdata=[{data:response[i].procountarray,label:'Project'},{data:response[i].funcountarray,label:'Funding'},{data:response[i].pubcountarray,label:'Publication'}]
      }
      console.log("after adding",response)
      this.isgraph=true;
        
    });
    
    
    
        
      
    this.service.getOverAllSnapshot().subscribe( response=>{
      this.pieChartData=[response.publication.scicount[0],response.publication.scopuscount[0],response.publication.othercount[0]]
      var d=new Date().getMonth()<6?new Date().getFullYear()-1:new Date().getFullYear();
      // console.log(response)
      //console.log(response.publication)
      // var year, count ;
      // this.years=[];
      // this.publication_counts_year=[];
      // this.funding_count_year=[];
      // for(year in response.publication.totalcount)
      // {
      //   count = response.publication.totalcount[year] ;
      //   this.years.push(year);
      //   this.publication_counts_year.push(count)
      // }
      // for(year in response.funding.yearwiseRatio)
      // {
      //   count = response.funding.yearwiseRatio[year] ;
      //   this.funding_count_year.push(count)
      // }
      // this.lineChartLabels2=this.years;
      // this.lineChartData=[{data:this.publication_counts_year, label: 'Publication'},{data:this.funding_count_year,label:'Funding received percentage'}]

      this.ispieset=true;
      console.log(response);
      this.overAllSnapshot = [{
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.AFUNDINGS,
        tileCount:[response.funding.appliedcount,response.funding.appliedamount]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.RFUNDINGS,
        tileCount:[response.funding.receivedcount,response.funding.receivedamount]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PROJECTS,
        tileCount:[response.projects.onGoingCount,response.projects.completedCount]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PUBLICATIONS,
        tileCount:[response.publication.totalcount[d],response.publication.totalcount[d-1]]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.PATENT,
        tileCount:[response.patent.curYear,response.patent.prevYear]
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE_TITLE.OTHER,
        tileCount:[response.projects.researchLabs,response.projects.contributors]
      },
    ]
  });
  }

}
