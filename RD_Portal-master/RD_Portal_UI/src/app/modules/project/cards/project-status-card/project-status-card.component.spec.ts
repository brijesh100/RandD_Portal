import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStatusCardComponent } from './project-status-card.component';

describe('ProjectStatusCardComponent', () => {
  let component: ProjectStatusCardComponent;
  let fixture: ComponentFixture<ProjectStatusCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStatusCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
