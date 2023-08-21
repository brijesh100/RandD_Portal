import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { RD_CONSTANT } from '../../../keys/constant';
import { ApiClientService } from './../../../service/api-client.service';
import { FormBuilder,FormGroup, FormControl,Validators} from '@angular/forms';
import {getDepartmentName, getDesignationName,getgroupName} from '../../../utils/project.utils';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  professors:any;
  asstprof:any;
  hod:any;
  non_teach:any;
  departmentId:any;
  students:any;
  user:any;
  archive:boolean;
  userForm = new FormGroup({
    userId: new FormControl('',[Validators.required, Validators.minLength(5)]),
    userName: new FormControl('',[Validators.required, Validators.minLength(3)]),
    userDesignationCode: new FormControl('',[Validators.required]),
    userGroup: new FormControl('',[Validators.required]),
    userDepartmentId: new FormControl('',[Validators.required])
  });
  designation: any;
  needDepartment:boolean;
  group: any;
  departments: any;
  admins: any;
  mngmts: any;
  allusers:any;
  archived: any;
  isarchived: any;
  constructor(private activatedRoute: ActivatedRoute,private service:ApiClientService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.departmentId=params;
      if(this.departmentId.deptId!="NIL")
      {
        this.service.getDepartmentUsers(this.departmentId.deptId).subscribe(users=>{
          this.allusers=users;
          this.professors=users.filter(prof=> prof.userDesignationCode=="PROFR" && prof.isarchived==false)
          this.students=users.filter(users=>users.userDesignationCode=="STUDT" && users.isarchived==false)
          this.hod=users.filter(hod=>hod.userDesignationCode=="HOD" && hod.isarchived==false)
          this.non_teach=users.filter(non=>non.userDesignationCode=="RESER" && non.isarchived==false)
          this.admins=users.filter(adm=>adm.userDesignationCode=="ADMIN" && adm.isarchived==false)
          this.mngmts=users.filter(mgn=>mgn.userDesignationCode=="MNGMT" && mgn.isarchived==false)
          this.archived=users.filter(arc=>arc.isarchived==true)
        });
      }
      else
      {
        this.service.getAllUser().subscribe(users=>{
          this.allusers=users;
          this.admins=users.filter(adm=>adm.userDesignationCode=="ADMIN" && adm.isarchived!=true)
          this.mngmts=users.filter(mgn=>mgn.userDesignationCode=="MNGMT" && mgn.isarchived!=true)
          this.archived=users.filter(arc=>arc.isarchived==true && (arc.userDesignationCode=="ADMIN" || arc.userDesignationCode=="MNGMT"))
        });
          
      }
      
    this.designation = RD_CONSTANT.DESIGNATION;
    this.group= RD_CONSTANT.SDESIGNATION
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
    })
    })
    
  }
  
  refresh()
  {
    location.reload()
   
  }
  
}
