import { Component, OnInit ,Input, OnChanges} from '@angular/core';
import { FormControl, FormBuilder} from '@angular/forms';
import { ApiClientService } from '../../../../../service/api-client.service';
@Component({
  selector: 'app-lock-card',
  templateUrl: './lock-card.component.html',
  styleUrls: ['./lock-card.component.css']
})
export class LockCardComponent implements OnInit {
  @Input() islocked:any;
  @Input() isAdmin:any;
  @Input() publicationid;
  modalmessage: string;
  constructor(private service: ApiClientService) { }

  ngOnInit(): void {
  }
  lchange(){
    if( this.isAdmin)
    {
      this.islocked=!this.islocked;
      if(this.islocked)
      {
        this.service.lockPublication(this.publicationid).subscribe(res=>{
          this.modalmessage="Project Locked"
        })
      }
      if(!this.islocked)
      {
        this.service.unlockPublication(this.publicationid).subscribe(res=>{
          this.modalmessage="Project Unlocked"
        })
      }
    }
    
  }
}
