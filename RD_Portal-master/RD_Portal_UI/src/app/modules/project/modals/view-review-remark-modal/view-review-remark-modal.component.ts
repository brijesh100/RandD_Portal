import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-review-remark-modal',
  templateUrl: './view-review-remark-modal.component.html',
  styleUrls: ['./view-review-remark-modal.component.css']
})
export class ViewReviewRemarkModalComponent implements OnInit {
  @Input() isEditMode:any;
  @Input() remarks:any;
  @Input() remarkLength:any;
  constructor() { }

  ngOnInit(): void {
  }

}
