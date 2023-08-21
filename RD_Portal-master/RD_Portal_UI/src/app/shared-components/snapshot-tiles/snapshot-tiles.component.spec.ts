import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnapshotTilesComponent } from './snapshot-tiles.component';

describe('SnapshotTilesComponent', () => {
  let component: SnapshotTilesComponent;
  let fixture: ComponentFixture<SnapshotTilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnapshotTilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnapshotTilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
