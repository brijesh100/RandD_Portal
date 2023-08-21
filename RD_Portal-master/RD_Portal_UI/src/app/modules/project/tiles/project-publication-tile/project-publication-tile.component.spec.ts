import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPublicationTileComponent } from './project-publication-tile.component';

describe('ProjectPublicationTileComponent', () => {
  let component: ProjectPublicationTileComponent;
  let fixture: ComponentFixture<ProjectPublicationTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPublicationTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPublicationTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
