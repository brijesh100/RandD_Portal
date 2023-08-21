import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

import { ApiClientService } from '../../../service/api-client.service';

@Component({
  selector: 'app-research-lab-form',
  templateUrl: './research-lab-form.component.html',
  styleUrls: ['./research-lab-form.component.css']
})
export class ResearchLabFormComponent implements OnInit {
  researchLabForm = new FormGroup({
    researchLabName: new FormControl('',[Validators.required, Validators.minLength(5)]),
    researchLabId: new FormControl('',[Validators.required, Validators.minLength(2)]),
    departmentId: new FormControl('',[Validators.required]),
    researchLabDesc: new FormControl('',[Validators.required, Validators.minLength(10)])
  });
  
  departments;
  successMessage:string;
  errorMessage:string;

  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
    this.service.getDepartments().subscribe(departments =>{
      let allDepartments = departments.map(
          dept => ({"departmentId" : dept.departmentId, "departmentName" :dept.departmentName})
      );
      this.departments = allDepartments;
    })
  }

  createResearchLab(){
    const {departmentId, ...researchLabDetail} = this.researchLabForm.value
    this.service.createResearchLab(researchLabDetail, departmentId).subscribe(response =>{
      this.clearMessage();
      this.successMessage = response.message;
      this.researchLabForm.reset();
    },
    error=>{
      this.clearMessage();
      this.errorMessage = error.errorMessage;
    })
  };

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  };

}
