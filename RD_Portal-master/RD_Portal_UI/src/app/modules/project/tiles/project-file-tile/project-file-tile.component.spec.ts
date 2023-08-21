import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFileTileComponent } from './project-file-tile.component';

describe('ProjectFileTileComponent', () => {
  let component: ProjectFileTileComponent;
  let fixture: ComponentFixture<ProjectFileTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectFileTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFileTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
