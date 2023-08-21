import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingDescriptionTileComponent } from './funding-description-tile.component';

describe('FundingDescriptionTileComponent', () => {
  let component: FundingDescriptionTileComponent;
  let fixture: ComponentFixture<FundingDescriptionTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingDescriptionTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingDescriptionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
