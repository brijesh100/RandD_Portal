import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingKeywordTileComponent } from './funding-keyword-tile.component';

describe('FundingKeywordTileComponent', () => {
  let component: FundingKeywordTileComponent;
  let fixture: ComponentFixture<FundingKeywordTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingKeywordTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingKeywordTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
