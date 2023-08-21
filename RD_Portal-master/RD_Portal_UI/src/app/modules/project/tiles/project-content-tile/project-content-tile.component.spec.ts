import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectContentTileComponent } from './project-content-tile.component';

describe('ProjectContentTileComponent', () => {
  let component: ProjectContentTileComponent;
  let fixture: ComponentFixture<ProjectContentTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectContentTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectContentTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
