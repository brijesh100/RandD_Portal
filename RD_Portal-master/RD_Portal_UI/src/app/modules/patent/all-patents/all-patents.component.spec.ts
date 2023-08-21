import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPatentsComponent } from './all-patents.component';

describe('AllPatentsComponent', () => {
  let component: AllPatentsComponent;
  let fixture: ComponentFixture<AllPatentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllPatentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPatentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
