import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFundingFormComponent } from './apply-funding-form.component';

describe('ApplyFundingFormComponent', () => {
  let component: ApplyFundingFormComponent;
  let fixture: ComponentFixture<ApplyFundingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyFundingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyFundingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
