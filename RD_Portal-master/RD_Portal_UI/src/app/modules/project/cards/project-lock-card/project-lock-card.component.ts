import { Component, OnInit ,Input, OnChanges} from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';
import { ApiClientService } from '../../../../service/api-client.service';
@Component({
  selector: 'app-project-lock-card',
  templateUrl: './project-lock-card.component.html',
  styleUrls: ['./project-lock-card.component.css']
})
export class ProjectLockCardComponent implements OnChanges {
  @Input() islocked:any;
  @Input() isEditMode:any;
  @Input() isAdmin:any;
  @Input() projectId;

  modalmessage:any;
  constructor(private service: ApiClientService) { }

  ngOnChanges(): void {

  }
  lchange(){
    if( this.isAdmin)
    {
      this.islocked=!this.islocked;
      if(this.islocked)
      {
        this.service.lockproject(this.projectId).subscribe(res=>{
          this.modalmessage="Project Locked"
        })
      }
      if(!this.islocked)
      {
        this.service.unlockproject(this.projectId).subscribe(res=>{
          this.modalmessage="Project Unlocked"
        })
      }
    }
    
  }
}
