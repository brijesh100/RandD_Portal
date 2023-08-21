import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublicationCardComponent } from './project-publication-card.component';

describe('ProjectPublicationCardComponent', () => {
  let component: ProjectPublicationCardComponent;
  let fixture: ComponentFixture<ProjectPublicationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPublicationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPublicationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
