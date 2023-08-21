import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReviewRemarkModalComponent } from './view-review-remark-modal.component';

describe('ViewReviewRemarkModalComponent', () => {
  let component: ViewReviewRemarkModalComponent;
  let fixture: ComponentFixture<ViewReviewRemarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReviewRemarkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReviewRemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
