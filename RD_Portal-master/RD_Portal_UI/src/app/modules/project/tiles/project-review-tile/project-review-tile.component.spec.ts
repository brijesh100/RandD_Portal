import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReviewTileComponent } from './project-review-tile.component';

describe('ProjectReviewTileComponent', () => {
  let component: ProjectReviewTileComponent;
  let fixture: ComponentFixture<ProjectReviewTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectReviewTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReviewTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
