import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-show-remark',
  templateUrl: './show-remark.component.html',
  styleUrls: ['./show-remark.component.css']
})
export class ShowRemarkComponent implements OnChanges {
  @Input() isEditMode:any;
  @Input() remarks:any;
  @Input() remarkLength:any;
  constructor() { }
  ngOnChanges(): void {
  }

}
