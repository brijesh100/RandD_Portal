import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContributorsCardComponent } from './project-contributors-card.component';

describe('ProjectContributorsCardComponent', () => {
  let component: ProjectContributorsCardComponent;
  let fixture: ComponentFixture<ProjectContributorsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectContributorsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContributorsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
