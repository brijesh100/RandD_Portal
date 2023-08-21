import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormArray, FormBuilder} from '@angular/forms';
import { ApiClientService } from 'src/app/service/api-client.service';
import { ActivatedRoute,Router } from '@angular/router';
import { RD_CONSTANT } from './../../../../keys/constant';
import { saveAs } from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-project-content-tile',
  templateUrl: './project-content-tile.component.html',
  styleUrls: ['./project-content-tile.component.css']
})
export class ProjectContentTileComponent implements OnChanges {
  @Input() projectContent:any;   
  @Input() isEditMode:any;
  @Input() edited:boolean;  
  @Output() isFormValid = new EventEmitter<any>();
  
  @Output() emitStatus = new EventEmitter<any>();
  
  projectContentForm: FormGroup;
  uploaded: any;
  pid:any;
  filledDocument: any;
  downloadableDocName:string;
  downloadableDocLink: any;
  starterpath:any;
  unsafeImageUrl:any;
  imageUrl: any;
  images: any;
 
  constructor(private fb: FormBuilder, private activatedRoute: ActivatedRoute, private sanitizer:DomSanitizer,
    private service: ApiClientService) {
  }
  
  ngOnChanges(): void {
    this.projectContentForm = this.fb.group({
      subSection: this.fb.array(this.populateSubSectionGroup())
    });
    this.activatedRoute.params.subscribe((params) => {
      this.pid=params.projectId;
    });
    this.starterpath=this.service.host;
    for(let i=0;i<this.projectContent.length;i++)
    {
      if(this.projectContent[i].documents)
      {
      const payload = {path :this.projectContent[i].documents.path+'/'+this.projectContent[i].documents.fileName}
    this.service.downloadProjectDoc(payload).subscribe(blob=>{
      this.unsafeImageUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
        this.projectContent[i].images=this.imageUrl
    }, error => {
        console.log(error);
    });
    }
  }
  
  this.uploaded= new Array(this.projectContent.length).fill(false)
    
  }
  
  ngDoCheck(){
    this.isFormValid.emit({
      index:RD_CONSTANT.PROJECT_TILE_INDEX.CONTENT, 
      value:this.projectContentForm.invalid
    });
  }
  populateSubSectionGroup(){
    let initialSubSectionArray = [];
    this.projectContent.forEach( cont =>{
      initialSubSectionArray.push(  this.fb.group({
        subHeading:[cont.subHeading,[Validators.required, Validators.minLength(3)]],
        subContent:[cont.subContent,[Validators.required, Validators.minLength(10)]],
        documents:[cont.documents]
      }));
    });
    return initialSubSectionArray;
  }
  
  get subSectionArray(){
    return <FormArray>this.projectContentForm.get('subSection');
  }

  addSubSection(){
    this.subSectionArray.push(this.getNewSubsection())
  }

  getNewSubsection(){
    return this.fb.group({
      subHeading:['',[Validators.required, Validators.minLength(3)]],
      subContent:['',[Validators.required, Validators.minLength(10)]],
      documents:['']
    })
  }

  deleteSubSection(index){
    this.subSectionArray.removeAt(index);
  }
  
  getFormData(){
    if(this.projectContentForm.invalid) return null;
    const {subSection} = this.projectContentForm.value;
    return subSection;
  }

  setView( documents){
    let doc = documents?.filledApplication;
    
    this.downloadableDocName = doc?.fileName;
    this.downloadableDocLink =`${doc?.path}/${doc?.fileName}`;
  }
  uploadApplication(i){
    const formData = new FormData();
  
    formData.append('file', this.filledDocument);
    this.service.uploadDetailFileProject(formData, this.pid).subscribe(res=>{
      console.log(res)
      this.projectContentForm.value.subSection[i].documents=res
    });
    this.uploaded[i]=true
  }
  selectApplication(event){
    if(event.target.files.length > 0){
      this.filledDocument = event.target.files[0];
    }
  }
  // showimage(i){
  //   const payload = {path :this.projectContent[i].documents.path+'/'+this.projectContent[i].documents.fileName}
  //   console.log(payload)
  //   this.service.downloadProjectDoc(payload).subscribe(blob=>{
  //     console.log(blob);
  //     //saveAs(blob);
  //     this.unsafeImageUrl = URL.createObjectURL(blob);
  //       this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
  //       this.images[i]=this.imageUrl;
  //       console.log(this.images)
  //       return this.imageUrl;
  //   }, error => {
  //       console.log(error);
  //   });
    
  // }
  download(i){
    console.log(this.projectContent)
    const payload = {path :this.projectContent[i].documents.path+'/'+this.projectContent[i].documents.fileName}
    console.log(payload)
    this.service.downloadProjectDoc(payload).subscribe(blob=>{
      console.log(blob);
      //saveAs(blob);
      this.unsafeImageUrl = URL.createObjectURL(blob);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.unsafeImageUrl);
    }, error => {
        console.log(error);
    });
  }
//   getImageFromService() {
//     this.authService.getProfileImage().subscribe(data => {
//         unsafeImageUrl = URL.createObjectURL(data);
//         imageUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
//     }, error => {
//         console.log(error);
//     });
// }

}
