import { Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import { saveAs } from 'file-saver';

import { RD_CONSTANT } from '../../../../../keys/constant'

import { ApiClientService } from 'src/app/service/api-client.service';

@Component({
  selector: 'app-fp-submit-tile',
  templateUrl: './fp-submit-tile.component.html',
  styleUrls: ['./fp-submit-tile.component.css']
})
export class FpSubmitTileComponent implements OnChanges {
  @Output() emitStatus = new EventEmitter<any>();

  @Input() status:string;
  @Input() documents:any;
  @Input() fundingProjectId:any;

  isFilled: boolean
  filledDocument: any;
  downloadableDocName:string;
  downloadableDocLink: any;
  constructor(
    private service: ApiClientService
  ) { }

  ngOnChanges(): void {
    this.isFilled =  this.status >= RD_CONSTANT.FUNDING_STATUS_CODE.FILLED;
    this.setView(this.status,this.documents);
  }
  setView(status, documents){
    let doc = documents?.filledApplication;
    this.status = status;
    this.downloadableDocName = doc?.fileName;
    this.downloadableDocLink =`${doc?.path}/${doc?.fileName}`;
  }

  selectApplication(event){
    if(event.target.files.length > 0){
      this.filledDocument = event.target.files[0];
    }
  }

  uploadApplication(){
    const formData = new FormData();
    formData.append('file', this.filledDocument);
    this.service.uploadFilledApplication(formData, this.fundingProjectId).subscribe(fundingProject=>{
      this.setView(fundingProject.response.status,fundingProject.response.documents);
      this.emitStatus.next(fundingProject.response);
    });
  }
  
  download(){
    const payload = {path :this.downloadableDocLink, fileName:this.downloadableDocName}
    this.service.downloadFundingProjectDoc(payload).subscribe(blob=>{
      saveAs(blob);
    });
  }

}
