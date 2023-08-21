import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDepartmentComponent } from './project-department.component';

describe('ProjectDepartmentComponent', () => {
  let component: ProjectDepartmentComponent;
  let fixture: ComponentFixture<ProjectDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
