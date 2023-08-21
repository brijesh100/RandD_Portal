import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationDashboardComponent } from './publication-dashboard.component';

describe('PublicationDashboardComponent', () => {
  let component: PublicationDashboardComponent;
  let fixture: ComponentFixture<PublicationDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
