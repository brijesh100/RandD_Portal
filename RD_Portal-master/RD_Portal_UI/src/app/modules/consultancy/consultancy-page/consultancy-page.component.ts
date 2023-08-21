import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

import { RD_CONSTANT } from './../../../keys/constant';

import {getEditAccess,validateAndUpdate,filterUserId,hasAdminAccess}  from "../../../utils/project.utils";


@Component({
  selector: 'app-consultancy-page',
  templateUrl: './consultancy-page.component.html',
  styleUrls: ['./consultancy-page.component.css']
})
export class ConsultancyPageComponent implements OnInit {

  isloading: boolean;
  consultancy:any;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = false;
      this.service.getConsultancyById(params.consultancyId).subscribe(res=>{
        console.log(res);
        this.consultancy=res;
      })
    })
  }

}
