import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import{ RD_CONSTANT} from '../../../../keys/constant';
import{ getYesterdayDate,getCreatedDate,filterUserId } from '../../../../utils/project.utils';
import { GlobalStoreService } from './../../../../service/global-store.service';
import { ApiClientService } from './../../../../service/api-client.service';

@Component({
  selector: 'app-funding-form',
  templateUrl: './funding-form.component.html',
  styleUrls: ['./funding-form.component.css']
})
export class FundingFormComponent implements OnInit {
  submitted = false;
    grant = new FormGroup({
      grantTitle: new FormControl('',[Validators.required, Validators.minLength(4)]),
      grantType: new FormControl('',[Validators.required, Validators.minLength(3)]),
      agency: new FormControl('',[Validators.required, Validators.minLength(3)]),
      scheme: new FormControl('', [Validators.required]),
      sanctionAmount: new FormControl('', [Validators.required]),
      dateOfSanction: new FormControl(''),
      sanctionRef: new FormControl('', [Validators.required]),
      principalInvestigator: new FormControl('', [Validators.required]),
      coInvestigators: new FormControl(''),
      duration: new FormControl('', [Validators.required]),
      projectId: new FormControl(''),
      searchedUserId: new FormControl('')
  });
  GRANT_TYPE = RD_CONSTANT.GRANT_TYPE;
  coInvestigators:any = [];
  searchedUserIdLists:any =[];
  searchedUserCoLists:any=[]
  usererror: string;
  principalError:Boolean = false;
  constructor(
    private service: ApiClientService,
    private formBuilder: FormBuilder,
    private globalStore: GlobalStoreService,
  ) { }
  get f() { return this.grant.controls; }

  ngOnInit(): void {
  }
  submitGrant(){
    this.submitted=true;
    if(this.grant.invalid){
      return;
    }
    this.grant.patchValue({"coInvestigators":this.coInvestigators});
    console.log(this.grant.value);
    this.service.createNewGrant(this.grant.value).subscribe(res=>{console.log(res)});

  }

  removeCoInvestigator(userId){
    this.coInvestigators = this.coInvestigators.filter(user => user != userId);
  }
  clearSearchList(){
    this.searchedUserCoLists=[];
  }
  addCoInvestigator(userId){
    this.service.getUserById(userId.split('-')[0]).subscribe(res=>{
    if(res){
     if(!this.coInvestigators.includes(userId) && 
     userId != "")
      {
        this.coInvestigators.push(userId);
        this.grant.patchValue({searchedUserId:""});
      }  
      } 
    },error => {
    this.usererror = error ;
  });
  }
  clearMessage(){
    this.usererror = "";
  }
  searchUser(userId){
    userId = userId.charAt(0).toUpperCase() + userId.slice(1).toLowerCase();
    if( this.searchedUserIdLists.length == 0 || userId != this.searchedUserIdLists[0]){
      this.service.getMatchingUserId(userId).subscribe( matchingIds =>{
        this.searchedUserIdLists = matchingIds;
      });
    }
  }
  searchUserCo(userId){
    userId = userId.charAt(0).toUpperCase() + userId.slice(1).toLowerCase();
    if( this.searchedUserCoLists.length == 0 || userId != this.searchedUserCoLists[0]){
      this.service.getMatchingUserId(userId).subscribe( matchingIds =>{
        this.searchedUserCoLists = matchingIds;
      });
    }
  }
}
