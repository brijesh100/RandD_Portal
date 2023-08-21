import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockCardComponent } from './lock-card.component';

describe('LockCardComponent', () => {
  let component: LockCardComponent;
  let fixture: ComponentFixture<LockCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
