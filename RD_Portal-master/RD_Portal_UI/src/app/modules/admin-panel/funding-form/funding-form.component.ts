import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';

import{ getTodayDate } from '../../../utils/project.utils';

import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-funding-form',
  templateUrl: './funding-form.component.html',
  styleUrls: ['./funding-form.component.css']
})

export class FundingFormComponent implements OnInit {
  fundingForm: FormGroup;
  todayDate: String = getTodayDate();
  successMessage: String;
  errorMessage: String;

  constructor(
    private fb: FormBuilder,
    private service: ApiClientService,
    private router:Router
    ) { }

  ngOnInit(): void {
    this.fundingForm = this.fb.group({
      nameOfGrant: ['', [Validators.required, Validators.minLength(5)]],
      fundingOrganisation: ['', [Validators.required, Validators.minLength(5)]],
      descriptionOfScheme: ['', [Validators.required, Validators.minLength(5)]],
      deadline: ['', [Validators.required]],
      additionalDetails : this.fb.array([this.getAdditionalDetailsGroup()]),
      fundingUrls : this.fb.array([this.getFundingUrlGroup()])
    });
  }

  get additionalDetails(){
    return <FormArray>this.fundingForm.get('additionalDetails');
  }

  get fundingUrls(){
    return <FormArray>this.fundingForm.get('fundingUrls');
  }

  getAdditionalDetailsGroup(){
    return this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]],
      detail: ['',[Validators.required, Validators.minLength(3)]]
    })
  }
  
  addAdditionalDetails(){
    this.additionalDetails.push( this.getAdditionalDetailsGroup() );
  }

  deleteAdditionalDetails(index){
    this.additionalDetails.removeAt(index);
  }

  getFundingUrlGroup(){
    return this.fb.group({
      title: ['',[Validators.required, Validators.minLength(3)]],
      url: ['',[Validators.required, Validators.minLength(3)]]
    })
  }

  addFundingUrl(){
    this.fundingUrls.push(this.getFundingUrlGroup());
  }

  deleteFundingUrl(index){
    this.fundingUrls.removeAt(index);
  }
  
  clearMessage(){
    this.errorMessage="";
    this.successMessage="";
  }

  createFunding(){
    let fundingDetails = this.fundingForm.value;
    this.service.createNewFunding(fundingDetails).subscribe( response=>{
      this.clearMessage();
      this.fundingForm.reset();
      this.router.navigate([`/funding/${response.fundingId}/edit`]);
    }, error=>{
      this.clearMessage();
      this.errorMessage = error;
    })
  }
}
