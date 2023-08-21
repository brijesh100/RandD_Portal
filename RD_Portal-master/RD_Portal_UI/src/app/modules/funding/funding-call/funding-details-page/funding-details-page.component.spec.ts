import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingDetailsPageComponent } from './funding-details-page.component';

describe('FundingDetailsPageComponent', () => {
  let component: FundingDetailsPageComponent;
  let fixture: ComponentFixture<FundingDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
