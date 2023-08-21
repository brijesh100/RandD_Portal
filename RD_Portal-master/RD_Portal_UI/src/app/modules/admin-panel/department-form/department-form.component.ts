import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';

import {ApiClientService} from '../../../service/api-client.service';

@Component({
  selector: 'app-department-form',
  templateUrl: './department-form.component.html',
  styleUrls: ['./department-form.component.css']
})
export class DepartmentFormComponent implements OnInit {
  departmentForm = new FormGroup({
    departmentName: new FormControl('',[Validators.required, Validators.minLength(8)]),
    departmentId: new FormControl('',[Validators.required, Validators.minLength(2)])
  });

  successMessage:string;
  errorMessage:string;

  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
  }

  createDepartment(){
      this.service.createDepartment(this.departmentForm.value).subscribe( response =>{
          this.clearMessage();
          this.successMessage = response.message;
          this.departmentForm.reset();
      },
      error=>{
        this.clearMessage();
        this.errorMessage = error;
      });
  }

  clearMessage(){
    this.errorMessage = "";
    this.successMessage = "";
  }
}
