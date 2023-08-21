import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpSummaryTileComponent } from './fp-summary-tile.component';

describe('FpSummaryTileComponent', () => {
  let component: FpSummaryTileComponent;
  let fixture: ComponentFixture<FpSummaryTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpSummaryTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpSummaryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
