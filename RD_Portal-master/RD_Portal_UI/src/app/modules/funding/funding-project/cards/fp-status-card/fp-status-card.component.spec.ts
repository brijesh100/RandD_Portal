import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpStatusCardComponent } from './fp-status-card.component';

describe('FpStatusCardComponent', () => {
  let component: FpStatusCardComponent;
  let fixture: ComponentFixture<FpStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
