import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedFpDetailsPageComponent } from './applied-fp-details-page.component';

describe('AppliedFpDetailsPageComponent', () => {
  let component: AppliedFpDetailsPageComponent;
  let fixture: ComponentFixture<AppliedFpDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppliedFpDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppliedFpDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
