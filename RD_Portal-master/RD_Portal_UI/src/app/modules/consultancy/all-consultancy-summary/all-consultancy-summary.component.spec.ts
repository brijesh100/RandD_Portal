import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllConsultancySummaryComponent } from './all-consultancy-summary.component';

describe('AllConsultancySummaryComponent', () => {
  let component: AllConsultancySummaryComponent;
  let fixture: ComponentFixture<AllConsultancySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllConsultancySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllConsultancySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
