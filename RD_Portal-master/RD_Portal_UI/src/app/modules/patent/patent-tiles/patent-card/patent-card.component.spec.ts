import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentCardComponent } from './patent-card.component';

describe('PatentCardComponent', () => {
  let component: PatentCardComponent;
  let fixture: ComponentFixture<PatentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
