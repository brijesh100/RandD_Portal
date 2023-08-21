import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
import { RD_CONSTANT } from 'src/app/keys/constant';
import { GlobalStoreService } from 'src/app/service/global-store.service';
import { hasAdminAccess } from 'src/app/utils/project.utils';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.css']
})
export class ProjectDashboardComponent implements OnInit, OnChanges {
  @Input() allProjects:any;
  @Input() departments:any;
  snapshot: any;
  errorMessage:string='';
  // bar chart
  barChartLabels = [];
  barChartType = 'bar';
  barChartLegend = true;
  barChartData = [];
  normalProjects:Array<number>;
  priorityProjects:Array<number>;
  public barChartOptions: any = {
    responsive: true,
  };
  public barChartColors = [
    { backgroundColor: RD_CONSTANT.chartColors.lpink},
    { backgroundColor: RD_CONSTANT.chartColors.lblue},
  ]
  // pie chart
  public pieChartOptions: ChartOptions = {
    title:{
      text:"Project Status ",
      display:true
    },
    legend:{position:'left',
    },
  };
  public pieChartLabels: Label[] = ['Ongoing','Under Review','Inactive', 'Completed'];
  public pieChartData=[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColors: any =[{
    backgroundColor:
    [RD_CONSTANT.chartColors.lblue,
     RD_CONSTANT.chartColors.yellow,
     RD_CONSTANT.chartColors.red,
     RD_CONSTANT.chartColors.bgreen
    ],borderColor: '#ffffff'}];
  departmentPie: any = 'all';
  darktheme:any;
  fromYear: any ='';
  toYear: any ='';
  projects:any;
  isadmin: boolean;
  isloading: boolean = false;
  constructor(private service : ApiClientService, private globalStore: GlobalStoreService) { }

  ngOnChanges(){
    if(this.allProjects && this.departments){
      this.projects = this.allProjects;
      this.setBarChartData(this.projects);
      this.setPieChartData(this.projects);
    }
  }

  ngOnInit(): void {
    console.log(this.allProjects)
    const {userDesignationCode, userName,userId,userDepartmentId,darktheme} = this.globalStore.getGlobalStore();
    this.setChartTheme(darktheme);
    this.isadmin=hasAdminAccess(userDesignationCode);
    this.isloading=true;
    this.service.getOverAllSnapshot().subscribe(response=>{
      this.snapshot = [
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.PiProjects,
        tileCount:response.projects.priorityCount
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.ReProjects,
        tileCount:response.projects.researchProjects,
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.CONTRIBUTORS,
        tileCount:response.projects.contributors
      },
      {
        tileName:RD_CONSTANT.SNAPSHOT_TILE.LABS,
        tileCount:response.projects.researchLabs
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
            stacked:true,
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }],
          yAxes: [{
            stacked:true,
            ticks: { fontColor: 'white' },
            gridLines: { color: 'rgba(255,255,255,0.1)' }
          }]
        }}
        this.pieChartOptions={
          title:{
            text:"Project Status ",
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
          backgroundColor: [RD_CONSTANT.chartColors.lblue,
            RD_CONSTANT.chartColors.yellow,
            RD_CONSTANT.chartColors.red,
            RD_CONSTANT.chartColors.bgreen
           ],borderColor: '#333333'
       }];
    }
//changed for light theme =>
    else if (darktheme =='false'){
      this.darktheme=false;
      this.barChartOptions={
        responsive: true,
        scales: {
          xAxes: [{
            stacked:true,

          }],
          yAxes: [{
            stacked:true,
          }]
        }}
    }
  }

  setBarChartData(project){
    this.barChartLabels=this.departments
    this.normalProjects = new Array<number>(this.departments.length).fill(0);
    this.priorityProjects = new Array<number>(this.departments.length).fill(0);
    project.forEach(element => {
      if(element.isPriority !== true){
        this.normalProjects[this.departments.indexOf(element.projectDepartment)]++;
      }else{
        this.priorityProjects[this.departments.indexOf(element.projectDepartment)]++;
      }
    })
    this.barChartData=[
      {data: this.priorityProjects, label: 'Total Priority'},
      {data: this.normalProjects, label: 'Total Research'},
    ];
  }
  setPieChartData(projects: any) {
    this.pieChartData = [
      projects.filter(project => project.status === '01').length,
      projects.filter(project => project.status === '00').length,
      projects.filter(project => project.status === '03').length,
      projects.filter(project => project.status === '02').length,
    ];
  }
  filter(){
    if(this.fromYear=='' || this.toYear==''){
      this.errorMessage = 'Please enter both year';
    }
    this.projects = this.allProjects.filter(project =>{
      if(this.fromYear!='' && this.toYear!=''){
        if(new Date(project.start).getFullYear()>=this.fromYear && new Date(project.start).getFullYear()<=this.toYear){
          return true;
        }
      }
      return false;
    })
    this.setBarChartData(this.projects);
    this.barChartData=[
      {data: this.priorityProjects, label: 'Priority ('+ this.fromYear +'-'+this.toYear+')'},
      {data: this.normalProjects, label: 'Research (' + this.fromYear +'-'+this.toYear+')'},
    ];
  }
  pieFilter(){
    if(this.departmentPie=='all'){
      this.projects = this.allProjects;
    }else{
      this.projects = this.allProjects.filter(project => project.projectDepartment === this.departmentPie);
    }
    this.setPieChartData(this.projects);
  }
  reset(){
    this.fromYear='';
    this.toYear='';
    this.projects = this.allProjects;
    this.setBarChartData(this.projects);
  }
  clearMessage(){
    this.errorMessage = '';
    this.reset();
  }
}
