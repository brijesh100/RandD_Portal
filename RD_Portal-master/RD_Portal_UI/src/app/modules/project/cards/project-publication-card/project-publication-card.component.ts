import { Component, OnInit,Input,OnChanges } from '@angular/core';
import { ApiClientService } from '../../../../service/api-client.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-project-publication-card',
  templateUrl: './project-publication-card.component.html',
  styleUrls: ['./project-publication-card.component.css']
})
export class ProjectPublicationCardComponent implements OnChanges {
  @Input() userId:any;
  @Input() publications:any;
  @Input() canedit:any;
  projectId:any;

  userpublications:any=[];
  publicationIds: any;
  publication:any=[];
  loadchk:boolean=false;
  constructor(private service: ApiClientService, private activatedRoute: ActivatedRoute) { }

  ngOnChanges(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.projectId=params.projectId;
    });
    if(this.publications)
    {this.publication=this.publications}
    else
    {this.publication=[]}
    this.loadchk=true;
    console.log(this.publication)
  }
  showpubs()
  {
    this.service.getPublicationsByUserId(this.userId).subscribe(res=>{

        this.userpublications=res;
      
      // this.userpublications=res.filter(res => res.publicationId);
      // this.userpublications = res.filter(function(o1){
      //   return !this.publication.some(function(o2){
      //       return o1.publicationId == o2.publicationId;          // assumes unique id
      //     });
      //   })
      //   console.log(this.userpublications);
      // }
      // else{
      //   this.userpublications=res
      // }
      })
    
  }
  linkpublication(publication){
    var found = false;
    for(var i = 0; i < this.publication.length; i++) {
        if (this.publication[i].publicationId == publication.publicationId) {
            found = true;
            break;
        }
    }
    if(!found){
      this.publication.push(publication)
    }
    
    // console.log(this.publication)
    // this.publicationIds={"publicationId":publicationID};
    // this.service.linkPublication(this.publicationIds,this.projectId).subscribe(res=>{
    //   console.log(res)
    // })
  }
  unlinkpublication(publicationId,i){
    this.publication.splice(this.publication.indexOf(publicationId), 1);
    console.log(this.publication)
  }
  addpublication(){
    const result = this.publication.map(({ publicationId, paperTitle }) => ({ publicationId, paperTitle }));
    this.service.linkPublication(result,this.projectId).subscribe(res=>{
      // window.location.reload()
    })
    // console.log(result)
  }

}
