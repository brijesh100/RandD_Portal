import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLockCardComponent } from './project-lock-card.component';

describe('ProjectLockCardComponent', () => {
  let component: ProjectLockCardComponent;
  let fixture: ComponentFixture<ProjectLockCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectLockCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectLockCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
