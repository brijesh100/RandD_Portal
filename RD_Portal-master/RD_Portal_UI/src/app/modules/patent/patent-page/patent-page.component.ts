import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiClientService } from './../../../service/api-client.service';
import { GlobalStoreService } from './../../../service/global-store.service';

import { RD_CONSTANT } from './../../../keys/constant';

import { getEditAccess, validateAndUpdate, filterUserId, hasAdminAccess } from "../../../utils/project.utils";
@Component({
  selector: 'app-patent-page',
  templateUrl: './patent-page.component.html',
  styleUrls: ['./patent-page.component.css']
})
export class PatentPageComponent implements OnInit {
  isloading: boolean;
  patent: any;
  canEdit: boolean;
  editMode: boolean;
  isAdmin: boolean
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiClientService,
    private router: Router,
    private globalStore: GlobalStoreService
  ) { }

  ngOnInit(): void {
    const { userDesignationCode, userName } = this.globalStore.getGlobalStore();
    this.activatedRoute.params.subscribe((params) => {
      this.isloading = false;
      this.editMode = false;
      this.service.getPatentById(params.patentId).subscribe(res => {
        console.log(res);
        this.patent = res;
        this.editMode = this.canEdit && (params.edit === 'edit');
        this.setNavigation(this.editMode);
      })
    })
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }

  setNavigation(edit) {
    if (edit)
      this.router.navigate([`/patent/${this.patent.patentId}/edit`]);
    else
      this.router.navigate([`/patent/${this.patent.patentId}`]);
  }

  onEditMode() {
    this.editMode = true;
    this.setNavigation(this.editMode);
  }
  onarchive() {

  }
}
