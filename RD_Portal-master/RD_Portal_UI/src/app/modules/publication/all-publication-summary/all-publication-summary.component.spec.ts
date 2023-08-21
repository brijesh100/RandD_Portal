import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPublicationSummaryComponent } from './all-publication-summary.component';

describe('AllPublicationSummaryComponent', () => {
  let component: AllPublicationSummaryComponent;
  let fixture: ComponentFixture<AllPublicationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPublicationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPublicationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
