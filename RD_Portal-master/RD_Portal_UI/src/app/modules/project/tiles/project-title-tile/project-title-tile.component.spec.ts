import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTitleTileComponent } from './project-title-tile.component';

describe('ProjectTitleTileComponent', () => {
  let component: ProjectTitleTileComponent;
  let fixture: ComponentFixture<ProjectTitleTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTitleTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTitleTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
