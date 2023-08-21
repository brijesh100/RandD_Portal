import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FpRemarkModalComponent } from './fp-remark-modal.component';

describe('FpRemarkModalComponent', () => {
  let component: FpRemarkModalComponent;
  let fixture: ComponentFixture<FpRemarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FpRemarkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FpRemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
