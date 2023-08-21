import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectVisibilityCardComponent } from './project-visibility-card.component';

describe('ProjectVisibilityCardComponent', () => {
  let component: ProjectVisibilityCardComponent;
  let fixture: ComponentFixture<ProjectVisibilityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectVisibilityCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectVisibilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
