import { Component, Output, EventEmitter, Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiClientService } from './../../../../service/api-client.service';
import { ActivatedRoute, Router } from '@angular/router';

import { GlobalStoreService } from '../../../../service/global-store.service';

import { getEditAccess, validateAndUpdate, filterUserId, hasAdminAccess } from "../../../../utils/project.utils";
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-publication-modal',
  templateUrl: './publication-modal.component.html',
  styleUrls: ['./publication-modal.component.css']
})
export class PublicationModalComponent implements OnChanges {
  @Input() publication: any;
  @Input() isClean: any = true;
  @Output() refresh = new EventEmitter<Boolean>();
  publicationHtml: any;
  constructor(private service: ApiClientService, private globalStore: GlobalStoreService, private http: HttpClient,
    private sanitizer: DomSanitizer) { }
  user: any;
  to: any;
  userId: any;
  messageDetails: any;
  islocked: any;
  isAdmin: boolean;
  isarchived: boolean;
  modalmessage: string;
  needsResolution: Boolean;
  publisherResolution: Boolean;
  @ViewChild('iframe') iframe: ElementRef;
  src = "https://turkjphysiotherrehabil.org/pub/pdf/321/32-1-698.pdf";
  ngOnChanges(): void {
    if (this.publication) {
      this.src = this.publication.DOIorURL;
      console.log(this.src);
      this.isarchived = this.publication.isarchived;
      this.islocked = this.publication.islocked;
      this.needsResolution = this.publication.resolve.needsResolution;
      console.log(this.publication.resolve.publisherId, this.publication.publisherId, this.publication.resolve.publisherId == this.publication.publisherId)
      this.publisherResolution = this.publication.resolve.publisherId[0] != this.publication.publisherId[0];
      this.iframe.nativeElement.setAttribute('src', 'about:blank');
      setTimeout(() => {

        this.iframe.nativeElement.setAttribute('src', this.publication.DOIorURL);
      }, 35)
    }
    const { userDesignationCode, userName, userId } = this.globalStore.getGlobalStore();
    this.userId = userId
    this.isAdmin = hasAdminAccess(userDesignationCode);
  }
  showUserOverview(userId) {
    this.service.getUserById(userId).subscribe(userdata => {
      this.user = userdata;
    })
  }
  onApprove() {
    this.service.approvePublication(this.publication.publicationId).subscribe(res => {
      this.to = this.publication.publisherId
      this.messageDetails = { "from": this.userId, "to": this.to, "payload": "Your Publication \"" + this.publication.paperTitle + "\" has been Approved", "type": "alert alert-success" }
      this.service.addMessage(this.messageDetails).subscribe()
      this.refresh.emit(true);
      this.modalmessage = "Approved Successfully";
    })
    // console.log("Approved")
    // this.router.navigate(['/admin-panel/approval/department-approval/{{dept}}']);
  }
  onarchive() {
    this.service.archivePublication(this.publication.publicationId).subscribe(res => {
      this.to = this.publication.publisherId
      this.messageDetails = { "from": this.userId, "to": this.to, "payload": "Your Publication \"" + this.publication.paperTitle + "\" has been Archived", "type": "alert alert-danger" }
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage = "Archived Successfully";
      this.refresh.emit(true);
    })
  }
  onrestore() {
    this.service.restorePublication(this.publication.publicationId).subscribe(res => {
      this.to = this.publication.publisherId
      this.messageDetails = { "from": this.userId, "to": this.to, "payload": "Your Publication \"" + this.publication.paperTitle + "\" has been Restored", "type": "alert alert-info" }
      this.service.addMessage(this.messageDetails).subscribe()
      this.modalmessage = "Restored Successfully"
      this.refresh.emit(true)
    })
  }
  onresolve() {
    let oldPublisher = this.publication.publisherId;
    this.publication.publisherId = this.publication.resolve.publisherId;
    this.publication.coAuthor = this.publication.resolve.coAuthor.slice();
    this.publication.Department = this.publication.resolve.Department.slice();
    this.publication.resolve = {}
    this.publication.approved = true;
    this.service.updatePublication(this.publication.publicationId, this.publication).subscribe(res => {
      this.to = this.publication.publisherId
      this.messageDetails = { "from": this.userId, "to": this.to, "payload": "Your Publication issue \"" + this.publication.paperTitle + "\" has been Resolved", "type": "alert alert-success" }
      this.service.addMessage(this.messageDetails).subscribe()
      this.messageDetails = { "from": this.userId, "to": oldPublisher, "payload": "A member has been added into your Publication \"" + this.publication.paperTitle + "\" ", "type": "alert alert-success" }
      this.service.addMessage(this.messageDetails).subscribe()
      this.refresh.emit(true);
      this.modalmessage = "Approved Successfully";
    })
  }
  clean() {
    // this.iframe.nativeElement.setAttribute('src', 'about:blank');
    // this.publication=null;
    this.isClean = true;
  }
  reload() {
    setTimeout(() => {

      this.iframe.nativeElement.setAttribute('src', this.publication.DOIorURL);
    }, 35)
  }
}
