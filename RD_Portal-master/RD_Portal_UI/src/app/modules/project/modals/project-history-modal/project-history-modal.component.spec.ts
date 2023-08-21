import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectHistoryModalComponent } from './project-history-modal.component';

describe('ProjectHistoryModalComponent', () => {
  let component: ProjectHistoryModalComponent;
  let fixture: ComponentFixture<ProjectHistoryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectHistoryModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectHistoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
