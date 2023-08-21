import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpInvestigatorCardComponent } from './fp-investigator-card.component';

describe('FpInvestigatorCardComponent', () => {
  let component: FpInvestigatorCardComponent;
  let fixture: ComponentFixture<FpInvestigatorCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpInvestigatorCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpInvestigatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
