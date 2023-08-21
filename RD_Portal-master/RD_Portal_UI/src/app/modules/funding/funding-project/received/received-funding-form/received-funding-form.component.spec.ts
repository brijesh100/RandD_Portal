import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedFundingFormComponent } from './received-funding-form.component';

describe('FundingFormComponent', () => {
  let component: ReceivedFundingFormComponent;
  let fixture: ComponentFixture<ReceivedFundingFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedFundingFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedFundingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
