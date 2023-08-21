import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingLinksCardComponent } from './funding-links-card.component';

describe('FundingLinksCardComponent', () => {
  let component: FundingLinksCardComponent;
  let fixture: ComponentFixture<FundingLinksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingLinksCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingLinksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
