import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedFpDetailsPageComponent } from './received-fp-details-page.component';

describe('ReceivedFpDetailsPageComponent', () => {
  let component: ReceivedFpDetailsPageComponent;
  let fixture: ComponentFixture<ReceivedFpDetailsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedFpDetailsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedFpDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
