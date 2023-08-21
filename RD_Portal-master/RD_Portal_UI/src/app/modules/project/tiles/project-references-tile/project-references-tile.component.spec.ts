import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReferencesTileComponent } from './project-references-tile.component';

describe('ProjectReferencesTileComponent', () => {
  let component: ProjectReferencesTileComponent;
  let fixture: ComponentFixture<ProjectReferencesTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReferencesTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReferencesTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
