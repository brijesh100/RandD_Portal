import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingHeaderSectionTileComponent } from './funding-header-section-tile.component';

describe('FundingHeaderSectionTileComponent', () => {
  let component: FundingHeaderSectionTileComponent;
  let fixture: ComponentFixture<FundingHeaderSectionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingHeaderSectionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingHeaderSectionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
