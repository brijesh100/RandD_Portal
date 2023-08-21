import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpHeaderSectionTileComponent } from './fp-header-section-tile.component';

describe('FpHeaderSectionTileComponent', () => {
  let component: FpHeaderSectionTileComponent;
  let fixture: ComponentFixture<FpHeaderSectionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpHeaderSectionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpHeaderSectionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
