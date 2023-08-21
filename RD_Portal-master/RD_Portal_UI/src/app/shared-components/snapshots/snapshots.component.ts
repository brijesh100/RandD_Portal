import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-snapshots',
  templateUrl: './snapshots.component.html',
  styleUrls: ['./snapshots.component.css']
})
export class SnapshotsComponent implements OnInit {

  @Input() snapshot: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.snapshot)
  }

}
