import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { GlobalStoreService } from './../../../service/global-store.service';
import {isUserWithProfile, hasAdminAccess} from './../../../utils/project.utils';
import { ApiClientService } from './../../../service/api-client.service';
import { RD_CONSTANT } from './../../../keys/constant';
@Component({
  selector: 'app-keyword-search',
  templateUrl: './keyword-search.component.html',
  styleUrls: ['./keyword-search.component.css']
})
export class KeywordSearchComponent implements OnInit {

  keyword:any;
  projects:any;
  user:any;
  isadmin:any;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: ApiClientService, 
    private router:Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const {userDesignationCode, userName,userId,userDepartmentId} = this.globalStore.getGlobalStore();
    this.isadmin=hasAdminAccess(userDesignationCode);
    this.activatedRoute.params.subscribe((params) => {
      this.keyword=params.key
      this.service.getKeywordProject(this.keyword).subscribe(res=>{
        console.log(res);
        //this.projects=res;
        this.projects = res.map( project =>{
          let {status,...other} = project;
          status = RD_CONSTANT.PROJECT_STATUS_MAP[status];
          return { status, ...other};
        });
      }) 
  });
}
}
