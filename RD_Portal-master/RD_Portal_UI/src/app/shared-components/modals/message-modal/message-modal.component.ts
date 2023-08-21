import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-message-modal',
  templateUrl: './message-modal.component.html',
  styleUrls: ['./message-modal.component.css']
})
export class MessageModalComponent implements OnInit {
  @Input() successMessage:string;
  @Input() goBack:any;
  constructor() { }

  ngOnInit(): void {
  }
  close()
  {
    if(this.goBack)
    {window.history.go(-1);}
  }

}
