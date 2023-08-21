import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentDashboardComponent } from './patent-dashboard.component';

describe('PatentDashboardComponent', () => {
  let component: PatentDashboardComponent;
  let fixture: ComponentFixture<PatentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
