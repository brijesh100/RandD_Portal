import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpAckTileComponent } from './fp-ack-tile.component';

describe('FpAckTileComponent', () => {
  let component: FpAckTileComponent;
  let fixture: ComponentFixture<FpAckTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpAckTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpAckTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
