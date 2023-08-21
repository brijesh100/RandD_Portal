import { ApiClientService } from 'src/app/service/api-client.service';
import { saveAs } from 'file-saver';
import { ActivatedRoute,Router } from '@angular/router';
import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-project-file-tile',
  templateUrl: './project-file-tile.component.html',
  styleUrls: ['./project-file-tile.component.css']
})
export class ProjectFileTileComponent implements OnChanges {
  @Input() isEditMode:any; 
  @Input() documents:any;
  @Input() projectId:any;
  @Input() canedit:any;
  @Output() emitStatus = new EventEmitter<any>();
  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: ApiClientService
  ) { }
  uploaded: boolean
  pid:any;
  filledDocument: any;
  downloadableDocName:string;
  downloadableDocLink: any;
  ngOnChanges(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.pid=params.projectId;
    });
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
    this.service.uploadFileProject(formData, this.pid).subscribe(res=>{
      this.emitStatus.next(res.response);
    });
    this.uploaded=true
  }
  selectApplication(event){
    if(event.target.files.length > 0){
      this.filledDocument = event.target.files[0];
    }
  }
  download(){
    const payload = {path :this.downloadableDocLink, fileName:this.downloadableDocName}
    this.service.downloadProjectDoc(payload).subscribe(blob=>{
      saveAs(blob);
    });
  }

}
