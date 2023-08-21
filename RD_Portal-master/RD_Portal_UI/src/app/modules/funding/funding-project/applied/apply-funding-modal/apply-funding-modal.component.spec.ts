import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFundingModalComponent } from './apply-funding-modal.component';

describe('ApplyFundingModalComponent', () => {
  let component: ApplyFundingModalComponent;
  let fixture: ComponentFixture<ApplyFundingModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyFundingModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyFundingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
