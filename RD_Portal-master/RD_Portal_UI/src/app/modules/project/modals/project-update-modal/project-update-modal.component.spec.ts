import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUpdateModalComponent } from './project-update-modal.component';

describe('ProjectUpdateModalComponent', () => {
  let component: ProjectUpdateModalComponent;
  let fixture: ComponentFixture<ProjectUpdateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUpdateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
