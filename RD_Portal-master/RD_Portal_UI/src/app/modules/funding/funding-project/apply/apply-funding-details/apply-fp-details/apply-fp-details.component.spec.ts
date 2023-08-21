import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyFpDetailsComponent } from './apply-fp-details.component';

describe('ApplyFpDetailsComponent', () => {
  let component: ApplyFpDetailsComponent;
  let fixture: ComponentFixture<ApplyFpDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyFpDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyFpDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
