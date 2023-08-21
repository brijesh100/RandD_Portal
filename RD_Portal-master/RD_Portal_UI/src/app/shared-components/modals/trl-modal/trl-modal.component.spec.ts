import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TRLModalComponent } from './trl-modal.component';

describe('TRLModalComponent', () => {
  let component: TRLModalComponent;
  let fixture: ComponentFixture<TRLModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TRLModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TRLModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
