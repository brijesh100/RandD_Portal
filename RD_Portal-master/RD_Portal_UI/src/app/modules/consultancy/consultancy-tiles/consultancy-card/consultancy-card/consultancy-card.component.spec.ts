import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultancyCardComponent } from './consultancy-card.component';

describe('ConsultancyCardComponent', () => {
  let component: ConsultancyCardComponent;
  let fixture: ComponentFixture<ConsultancyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultancyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultancyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
