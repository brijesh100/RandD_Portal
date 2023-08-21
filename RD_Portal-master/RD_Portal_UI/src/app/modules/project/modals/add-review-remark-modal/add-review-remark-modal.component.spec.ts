import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReviewRemarkModalComponent } from './add-review-remark-modal.component';

describe('AddReviewRemarkModalComponent', () => {
  let component: AddReviewRemarkModalComponent;
  let fixture: ComponentFixture<AddReviewRemarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReviewRemarkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReviewRemarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
