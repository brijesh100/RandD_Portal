import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFundingCardComponent } from './project-funding-card.component';

describe('ProjectFundingCardComponent', () => {
  let component: ProjectFundingCardComponent;
  let fixture: ComponentFixture<ProjectFundingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFundingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFundingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
