import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSummaryTileComponent } from './project-summary-tile.component';

describe('ProjectSummaryTileComponent', () => {
  let component: ProjectSummaryTileComponent;
  let fixture: ComponentFixture<ProjectSummaryTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSummaryTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSummaryTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
