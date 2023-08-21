import { Component, Input, Output, OnInit, EventEmitter, DoCheck, OnChanges } from '@angular/core';
import { ApiClientService } from 'src/app/service/api-client.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-fp-project-tile',
  templateUrl: './fp-project-tile.component.html',
  styleUrls: ['./fp-project-tile.component.css']
})
export class FpProjectTileComponent implements OnChanges {
  @Input() project:any; 
  @Input() isEditMode:any; 
  @Input() fundingprojectId:any;
  @Input() documents:any;
  @Output() emitStatus = new EventEmitter<any>();
  constructor(private service: ApiClientService) { }
  uploaded: boolean
  filledDocument: any;
  downloadableDocName:string;
  downloadableDocLink: any;
  ngOnChanges(): void {
    this.setView(this.documents);
  }
  setView( documents){
    let doc = documents?.filledApplication;
    
    this.downloadableDocName = doc?.fileName;
    this.downloadableDocLink =`${doc?.path}/${doc?.fileName}`;
  }
  uploadApplication(){
    const formData = new FormData();
  
    formData.append('file', this.filledDocument);
    this.service.uploadFilledApplication(formData, this.fundingprojectId).subscribe(fundingProject=>{
      this.setView(fundingProject.response.documents);
      this.emitStatus.next(fundingProject.response);
    });
    this.uploaded=true
  }
  selectApplication(event){
    if(event.target.files.length > 0){
      
      this.filledDocument = event.target.files[0];
      console.log(this.filledDocument)
    }
  }
  download(){
    const payload = {path :this.downloadableDocLink, fileName:this.downloadableDocName}
    console.log(payload)
    this.service.downloadProjectDoc(payload).subscribe(blob=>{
      saveAs(blob);
    });
  }

}
