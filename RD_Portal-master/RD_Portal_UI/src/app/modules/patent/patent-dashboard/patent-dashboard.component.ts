import { filter } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
import { RD_CONSTANT } from 'src/app/keys/constant';
import { GlobalStoreService } from 'src/app/service/global-store.service';
import { hasAdminAccess } from 'src/app/utils/project.utils';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-patent-dashboard',
  templateUrl: './patent-dashboard.component.html',
  styleUrls: ['./patent-dashboard.component.css']
})
export class PatentDashboardComponent implements OnInit,OnChanges {
  @Input() allPatents:any;
  @Input() departments:any;
  snapshot: any;
  errorMessage:string='';
  // bar chart
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];


  public barChartOptions: any = {
    responsive: true,
  };
  public barChartColors = [
    { backgroundColor: RD_CONSTANT.chartColors.bgreen},
    { backgroundColor: RD_CONSTANT.chartColors.lblue},
    { backgroundColor: RD_CONSTANT.chartColors.red},
    { backgroundColor: RD_CONSTANT.chartColors.white},
    { backgroundColor: RD_CONSTANT.chartColors.purple},

  ]
  // pie chart
  public pieChartOptions: ChartOptions = {
    responsive:true,
    title:{
      text:"Patent Status",
      display:true
    },
    legend:{position:'left',
    },
  };
  public pieChartLabels: Label[] = RD_CONSTANT.TRlevelsLabel;
  public pieChartData=[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColors: any =[{
    backgroundColor:
    [
      RD_CONSTANT.chartColors.bgreen,
      RD_CONSTANT.chartColors.orange,
      RD_CONSTANT.chartColors.yellow,
      RD_CONSTANT.chartColors.grey,
      RD_CONSTANT.chartColors.darkgrey,
      RD_CONSTANT.chartColors.lpink,
      RD_CONSTANT.chartColors.lblue,
      RD_CONSTANT.chartColors.white,
      RD_CONSTANT.chartColors.green2,
      RD_CONSTANT.chartColors.red
    ],borderColor: '#ffffff'}];
  departmentPie: any = 'all';
  darktheme:any;
  fromYear: any ='';
  toYear: any ='';
  patents:any;
  isadmin: boolean;
  isloading: boolean = false;
  filedCounts: Array<number>;
  publishedCounts: Array<number>;
  ferSubmittedCounts: Array<number>;
  hearingCompletedcounts: Array<number>;
  grantedCounts: Array<number>;
  constructor(private service : ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnChanges(){
    if(this.allPatents && this.departments){
      this.patents = this.allPatents;
      this.setBarChartData(this.patents);
      this.setPieChartData(this.patents);
      console.log(this.departments);
      console.log(this.allPatents);
    }

  }


  ngOnInit(): void {
    console.log(this.departmentPie)
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();
    this.setChartTheme(darktheme);
    this.isadmin=hasAdminAccess(userDesignationCode);
    this.isloading=true;
    this.service.getOverAllSnapshot().subscribe(response=>{
      console.log(response)
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
          responsive:true,
          title:{
            text:"Patent Status ",
            fontColor: 'rgb(255,255,255)',
            display:true
          },
          legend:{position:'left',
          labels: {
            fontColor: 'rgb(255,255,255)',

          }
          },

        }
        this.pieChartColors= [{
          backgroundColor: [
            RD_CONSTANT.chartColors.green,
      RD_CONSTANT.chartColors.bgreen,
      RD_CONSTANT.chartColors.yellow,
      RD_CONSTANT.chartColors.grey2,
      RD_CONSTANT.chartColors.darkgrey,
      RD_CONSTANT.chartColors.lpink,
      RD_CONSTANT.chartColors.lblue,
      RD_CONSTANT.chartColors.white,
      RD_CONSTANT.chartColors.green2,
      RD_CONSTANT.chartColors.red

           ],borderColor: '#333333'
       }];
    }
  }

  setBarChartData(patent){
    console.log(this.departments)
    this.barChartLabels=this.departments
    this.grantedCounts = new Array<number>(this.patents.filter(patent=>patent.patentStatus=="Granted"|| this.departments ).length,).fill(0);
    this.publishedCounts = new Array<number>(this.patents.filter(patent=>patent.patentStatus=="Published" || this.departments).length).fill(0);
    this.ferSubmittedCounts = new Array<number>(this.patents.filter(patent=>patent.patentStatus=="FER Submitted" || this.departments).length).fill(0);
    this.hearingCompletedcounts = new Array<number>(this.patents.filter(patent=>patent.patentStatus=="Hearing Completed" || this.departments).length).fill(0);
    this.filedCounts = new Array<number>(this.patents.filter(patent=>patent.patentStatus=="Filed"|| this.departments).length).fill(0);

    patent.forEach(element => {

      if(element.patentStatus=="Granted")
      this.grantedCounts[this.departments.indexOf(element.patentDepartment)]++;
      else if(element.patentStatus=="Published" )
      this.publishedCounts[this.departments.indexOf(element.patentDepartment)]++;
      else if(element.patentStatus=="FER Submitted" )
      this.ferSubmittedCounts[this.departments.indexOf(element.patentDepartment)]++;
      else if(element.patentStatus=="Hearing Completed" )
      this.hearingCompletedcounts[this.departments.indexOf(element.patentDepartment)]++;
      else if(element.patentStatus=="Filed" )
      this.filedCounts[this.departments.indexOf(element.patentDepartment)]++;
      else return false
    })

    this.barChartData=[
      {data: this.grantedCounts, label: 'Granted'},
      {data: this.publishedCounts, label: 'Published'},
      {data: this.ferSubmittedCounts, label: 'Fer Submitted'},
      {data: this.hearingCompletedcounts, label: 'Hearing Completed'},
      {data: this.filedCounts, label: 'Filed'}
    ];
    console.log(this.barChartData);
    console.log(this.departments);
  }

  setPieChartData(patent){
    this.pieChartData=[
      patent.filter(patents => patents.TechnologyReadinessLevel === 9 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 8 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 7 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 6 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 5 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 4 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 3 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 2 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 1 ).length,
      patent.filter(patents => patents.TechnologyReadinessLevel === 0 ).length,
    ];
  }

  pieFilter(){
    if(this.departmentPie=='all'){
      this.patents = this.allPatents;
    }
    else{
      this.patents = this.allPatents.filter(pat => {
        if(pat.patentDepartment === this.departmentPie) return true;

        return false;
        });
    }
    this.setPieChartData(this.patents);
  }

  filter(){
    this.patents = this.allPatents.filter(patent =>{
      if(this.fromYear!='' && this.toYear!=''){
        if(new Date(patent.patentDate).getFullYear()>=this.fromYear && new Date(patent.patentDate).getFullYear()<=this.toYear){
          return true;
        }
      }
      return false;
    })
    this.setBarChartData(this.patents);
    this.barChartData=[
      {data: this.grantedCounts, label: 'Granted ('+ this.fromYear +'-'+this.toYear+')' },
      {data: this.publishedCounts, label: 'Published ('+ this.fromYear +'-'+this.toYear+')'},
      {data: this.ferSubmittedCounts, label: 'Fer Submitted ('+ this.fromYear +'-'+this.toYear+')'},
      {data: this.hearingCompletedcounts, label: 'Hearing Completed ('+ this.fromYear +'-'+this.toYear+')'},
      {data: this.filedCounts, label: 'Filed ('+ this.fromYear +'-'+this.toYear+')'}
    ];
  }

  reset(){
    this.fromYear=' ';
    this.toYear=' ';
    this.patents = this.allPatents;
    this.setBarChartData(this.patents);
  }


  clearMessage(){
    this.reset();
  }

}
