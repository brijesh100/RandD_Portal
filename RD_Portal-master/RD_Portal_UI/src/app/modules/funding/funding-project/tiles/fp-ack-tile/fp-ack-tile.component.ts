import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { saveAs } from 'file-saver';

import { RD_CONSTANT } from '../../../../../keys/constant';

import { ApiClientService } from '../../../../../service/api-client.service';

@Component({
  selector: 'app-fp-ack-tile',
  templateUrl: './fp-ack-tile.component.html',
  styleUrls: ['./fp-ack-tile.component.css']
})
export class FpAckTileComponent implements OnChanges {
  @Output() emitStatus = new EventEmitter<any>();

  @Input() status:string;
  @Input() documents:any;
  @Input() fundingProjectId:any;

  isChecked:boolean;
  isSubmitted:boolean;

  acknowlegdment: any;
  downloadableDocName:string;
  downloadableDocLink: any;

  constructor(
    private service: ApiClientService
  ) { }

  ngOnChanges(): void {
    this.isChecked =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.CHECKED;
    this.isSubmitted =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.SUBMITTED;
    this.setView(this.status,this.documents);
  }
  
  setView(status, documents){
    let doc = documents?.acknowlegdment;
    this.status = status;
    this.downloadableDocName = doc?.fileName;
    this.downloadableDocLink =`${doc?.path}/${doc?.fileName}`;
    console.log(this.downloadableDocName);
  }

  selectAcknowledgement(event){
    if(event.target.files.length > 0){
      this.acknowlegdment = event.target.files[0];
    }
  }

  uploadAcknowledgement(){
    const formData = new FormData();
    formData.append('file', this.acknowlegdment);
    this.service.uploadFpAck(formData, this.fundingProjectId).subscribe(fundingProject=>{
      this.setView(fundingProject.response.status, fundingProject.response.documents);
      this.emitStatus.next(fundingProject.response);
    });
  }
  
  download(){
    const payload = {path :this.downloadableDocLink, fileName:this.downloadableDocName}
    console.log(payload);
    this.service.downloadFundingProjectDoc(payload).subscribe(blob=>{
      saveAs(blob);
    });
  }
}
