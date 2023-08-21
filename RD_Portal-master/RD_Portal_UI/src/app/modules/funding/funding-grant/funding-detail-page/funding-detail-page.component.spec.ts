import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingDetailPageComponent } from './funding-detail-page.component';

describe('FundingDetailPageComponent', () => {
  let component: FundingDetailPageComponent;
  let fixture: ComponentFixture<FundingDetailPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundingDetailPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
