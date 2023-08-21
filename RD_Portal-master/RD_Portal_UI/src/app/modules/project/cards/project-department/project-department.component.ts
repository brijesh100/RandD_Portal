import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-project-department',
  templateUrl: './project-department.component.html',
  styleUrls: ['./project-department.component.css']
})
export class ProjectDepartmentComponent implements OnInit,OnChanges {
  @Input() departments;
  @Input() isEditMode;

  departmentForm: FormGroup;
  allDepartments: any;
  selectDept:any = '';
  constructor(private fb: FormBuilder,private service: ApiClientService) { }
  ngOnChanges(): void {
    this.departmentForm = this.fb.group({
      projectDepartments: this.fb.array(this.departments)
    });
    console.log(this.departments);
  }

  ngOnInit(): void {
    this.service.getDepartments().subscribe(res=>{
      this.allDepartments = res.map(d => d.departmentId);
    });
  }
  deleteDept(index){
    this.departments.splice(index,1);
  }
  addDepartment(){
    if(this.departments.indexOf(this.selectDept)==-1 && this.selectDept!=''){
    this.departments.push(this.selectDept);
    }
  }
  getFormData(){
    return this.departments;
  }
}
