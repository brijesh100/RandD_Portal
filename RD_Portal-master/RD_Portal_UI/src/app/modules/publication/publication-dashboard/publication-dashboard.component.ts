import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RD_CONSTANT } from 'src/app/keys/constant';
import { ApiClientService } from 'src/app/service/api-client.service';
import { GlobalStoreService } from 'src/app/service/global-store.service';
import { hasAdminAccess } from 'src/app/utils/project.utils';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-publication-dashboard',
  templateUrl: './publication-dashboard.component.html',
  styleUrls: ['./publication-dashboard.component.css']
})
export class PublicationDashboardComponent implements OnInit,OnChanges {

  @Input() allPublications: any;
  @Input() departments:any;
  snapshot: any;

  publication: any;
  publications:any;
  allPublishers:Set<string>=new Set<string>();
  // bar chart
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];
  publicationCounts:Array<number>;
  public barChartOptions: any = {
    responsive: true,
  };
  public ChartColors = [
    { backgroundColor: RD_CONSTANT.chartColors.lblue},
  ]

  fromYear: any;
  toYear: any;

  // pie chart
  public pieChartOptions: ChartOptions = {
    title:{
      text:"Publication Types ",
      display:true
    },
    legend:{position:'left',
    },
  };
  public pieChartLabels: Label[] = RD_CONSTANT.PublicationTypes;
  public pieChartData=[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColors: any =[{
    backgroundColor:
    [ RD_CONSTANT.chartColors.lblue,
      RD_CONSTANT.chartColors.bgreen,
      RD_CONSTANT.chartColors.lpink,
      RD_CONSTANT.chartColors.yellow,
      RD_CONSTANT.chartColors.purple,
      RD_CONSTANT.chartColors.white,

    ],borderColor: '#ffffff'}];
  departmentPie: any = 'all';

  darktheme: boolean;
  isadmin: boolean;
  isloading:boolean=false;
  sciCounts: Array<number>;
  scopusCounts: Array<number>;
  otherCounts: Array<number>;
  totalPublishers: Array<number>;

  constructor(
    private service : ApiClientService,
    private globalStore : GlobalStoreService
  ) { }

  ngOnChanges() {
    if(this.allPublications && this.departments){
      this.publication = this.allPublications;
      this.setBarChartData(this.publication);
      this.setPieChartData(this.publication);
    }

  }

  ngOnInit(): void {
    const {userDesignationCode,darktheme} = this.globalStore.getGlobalStore();
    this.setChartTheme(darktheme);
    this.isadmin=hasAdminAccess(userDesignationCode);
    this.isloading=true;
    this.service.getOverAllSnapshot().subscribe(response=>{
      console.log(response)
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
        tileCount:response.publication.totalpublishers
      }
    ]
    this.isloading=false;

    })


  }
  setChartTheme(darktheme){
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
            gridLines: { color: 'rgba(255,255,255,0.1)' },
            stacked:true,
          }],
          yAxes: [{
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' },
            stacked:true,
          }]
        }}
        this.pieChartOptions={
          title:{
            text:"Publication Types ",
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
        this.pieChartColors= [{
          backgroundColor: [
            RD_CONSTANT.chartColors.lblue,
            RD_CONSTANT.chartColors.bgreen,
            RD_CONSTANT.chartColors.lpink,
            RD_CONSTANT.chartColors.yellow,
            RD_CONSTANT.chartColors.purple,
            RD_CONSTANT.chartColors.darkgrey,

           ],borderColor: '#333333'
       }];
    }
  }

  setBarChartData(publications){
    console.log(this.departments)

// prev code ==>
    this.barChartLabels=this.departments
    this.publicationCounts = new Array<number>(this.departments.length).fill(0);

    publications.forEach(element => {
      this.publicationCounts[this.departments.indexOf(element.Department)]++;
    })
    this.barChartData=[
      {data: this.publicationCounts, label: 'Total Publications'},
    ];
    console.log(this.barChartData)

// New Code ==>

    // this.barChartLabels=this.departments
    // this.publications=this.allPublications.filter(publication=> publication.approved==true || publication.isarchived!=true) ;
    // this.sciCounts = new Array<number>(this.publications.filter(pub=>pub.indexing=="SCI" ).length).fill(0);
    // this.scopusCounts = new Array<number>(this.publications.filter(pub=>pub.indexing=="SCOPUS" ).length).fill(0);
    // this.otherCounts = new Array<number>(this.publications.filter(pub=>pub.indexing=="Others" ).length).fill(0);
    // this.totalPublishers = new Array<number>(this.publications.map(pub=>pub.publisherId).length).fill(0);
    // console.log(this.publications);
   // ==>// publications.forEach(element => {
    //   if(element.indexing=="SCI" && element.approved==true)
    //   this.sciCounts[this.departments.indexOf(element.Department)]++;

    //   else if(element.indexing=="SCOPUS" && element.approved==true)
    //   this.scopusCounts[this.departments.indexOf(element.Department)]++;

    //   else if(element.indexing=="Others" && element.approved==true)
    //   this.otherCounts[this.departments.indexOf(element.Department)]++;

    //   else return false
      // this.totalPublishers[this.departments.indexOf(element.Department)]++;
    // })

    // this.barChartData=[
    //   {data: this.sciCounts, label: 'SCI'},
    //   {data: this.scopusCounts, label: 'SCOPUS'},
    //   {data: this.otherCounts, label: 'Others'},
    //   // {data: this.totalPublishers, label: 'Total publishers'},

    // ];
    // console.log(this.barChartData);
    // console.log(this.departments);
  }
  setPieChartData(publications){
    this.pieChartData=[];
    for(let i=0;i<7;i++)
    {
      this.pieChartData.push( publications.filter(pub => pub.publicationType==RD_CONSTANT.PublicationTypes[i]).length)
    }
    console.log(this.pieChartData);
  }
  filter(){
    this.publication = this.allPublications.filter(pub =>{
      if(this.fromYear!='' && this.toYear!=''){
        if(new Date(pub.yearOfPublication).getFullYear()>=this.fromYear && new Date(pub.yearOfPublication).getFullYear()<=this.toYear){
          return true;
        }
      }
      return false;
    })
    this.setBarChartData(this.publication);
    this.barChartData=[
      {data: this.publicationCounts, label: 'Publications ('+this.fromYear +'-'+this.toYear+')'},
    ];
  }
  pieFilter(){
    if(this.departmentPie=='all'){
      this.publication = this.allPublications;
    }
    else{
      this.publication = this.allPublications.filter(pub =>{
        if(pub.Department==this.departmentPie){
          return true;
        }
        return false;
      })
    }
    this.setPieChartData(this.publication);
  }
  reset(){
    this.fromYear='';
    this.toYear='';
    this.publication = this.allPublications;
    this.setBarChartData(this.publication);
  }
  clearMessage(){
    this.reset();
  }

}
