import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfirmationModalComponent } from './update-confirmation-modal.component';

describe('UpdateConfirmationModalComponent', () => {
  let component: UpdateConfirmationModalComponent;
  let fixture: ComponentFixture<UpdateConfirmationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConfirmationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
