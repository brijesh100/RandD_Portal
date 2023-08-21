import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from 'src/app/service/api-client.service';
import { GlobalStoreService } from 'src/app/service/global-store.service';

@Component({
  selector: 'app-publication-author-resolve-modal',
  templateUrl: './publication-author-resolve-modal.component.html',
  styleUrls: ['./publication-author-resolve-modal.component.css']
})
export class PublicationAuthorResolveModalComponent implements OnInit, OnChanges {
  @Input() matchedPublication: any;
  userID: String;
  userDepartment: String;
  reEntry: Boolean;
  oldPublication: any;
  constructor(private service: ApiClientService,
    private globalStore: GlobalStoreService,
    private router: Router) { }

  ngOnInit(): void {
    const { userId, userName, userDepartmentId } = this.globalStore.getGlobalStore();
    this.userID = userId;
    this.userDepartment = userDepartmentId;
  }
  ngOnChanges(): void {
    if (this.matchedPublication) {
      this.service.getPublicationDetailsbyId(this.matchedPublication).subscribe(res => {
        if (res.publisherId == this.userID || res.coAuthor.includes(this.userID)) {
          this.reEntry = true;
        }
        this.oldPublication = res;
      })
    }
  }

  resolvePublication(option) {
    console.log(this.userID)

    const resolve = {
      needsResolution: true,

      publisherId: this.oldPublication.publisherId,
      coAuthor: this.oldPublication.coAuthor.slice(),
      Department: this.oldPublication.Department.slice()
    }
    if (option = 'coAuthor') {
      console.log(resolve)
      resolve.coAuthor.push(this.userID);

    }
    else if (option = "publisher") {
      resolve.coAuthor.push(this.oldPublication.publisherId);

      resolve.publisherId = this.userID;
      resolve.Department = [this.userDepartment];
    }
    let res = this.oldPublication;
    res.resolve = resolve;
    res.approved = false;
    if (this.oldPublication.isLocked) {
      alert('locked, cannot update, contact admin to unlock');
    }
    else {
      this.service.updatePublication(this.oldPublication.publicationId, res).subscribe(pub => {

        alert('Updated successfully.Please wait till the Admin resolves the issue');
        let messageDetails = { "from": 'ADMIN', "to": this.userID, "payload": "The Publication \"" + this.oldPublication.paperTitle + "\" will be updated soon", "type": "alert alert-warning" }
        this.service.addMessage(messageDetails).subscribe(mes => {

          this.router.navigate(['user']);
        })
      });
    }

  }


}
