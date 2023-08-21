import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FibreSummaryComponent } from './fibre-summary.component';

describe('FibreSummaryComponent', () => {
  let component: FibreSummaryComponent;
  let fixture: ComponentFixture<FibreSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FibreSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FibreSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
