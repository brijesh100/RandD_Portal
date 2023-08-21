import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectKeywordsTileComponent } from './project-keywords-tile.component';

describe('ProjectKeywordsTileComponent', () => {
  let component: ProjectKeywordsTileComponent;
  let fixture: ComponentFixture<ProjectKeywordsTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectKeywordsTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectKeywordsTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
