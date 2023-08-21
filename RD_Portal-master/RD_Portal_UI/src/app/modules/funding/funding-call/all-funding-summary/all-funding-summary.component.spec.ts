import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFundingSummaryComponent } from './all-funding-summary.component';

describe('AllFundingSummaryComponent', () => {
  let component: AllFundingSummaryComponent;
  let fixture: ComponentFixture<AllFundingSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFundingSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFundingSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
