import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms'
import { ApiClientService } from '../../../../../service/api-client.service';
@Component({
  selector: 'app-fp-remark-modal',
  templateUrl: './fp-remark-modal.component.html',
  styleUrls: ['./fp-remark-modal.component.css']
})
export class FpRemarkModalComponent implements OnChanges {
  @Input() isAdmin:boolean;
  @Input() sremark:any;
  @Input() fundingprojectId:any;
  @Output() remarkemit = new EventEmitter<any>();
 

  remarkform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ApiClientService
    ) { }

  ngOnChanges(): void {
    this.remarkform = this.fb.group({
      remarks : ["", [Validators.required, Validators.minLength(8)]]
    });
  }
  addremark()
  {
    this.service.fpaddRemarks(this.remarkform.value,this.fundingprojectId).subscribe()
    this.remarkemit.emit()
  }

}
