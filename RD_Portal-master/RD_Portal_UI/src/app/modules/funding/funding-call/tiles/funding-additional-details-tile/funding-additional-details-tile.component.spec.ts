import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingAdditionalDetailsTileComponent } from './funding-additional-details-tile.component';

describe('FundingAdditionalDetailsTileComponent', () => {
  let component: FundingAdditionalDetailsTileComponent;
  let fixture: ComponentFixture<FundingAdditionalDetailsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingAdditionalDetailsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingAdditionalDetailsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
