import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectSummaryComponent } from './all-project-summary.component';

describe('AllProjectSummaryComponent', () => {
  let component: AllProjectSummaryComponent;
  let fixture: ComponentFixture<AllProjectSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProjectSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
