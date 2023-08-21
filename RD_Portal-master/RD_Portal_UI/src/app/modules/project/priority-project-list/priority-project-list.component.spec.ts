import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityProjectListComponent } from './priority-project-list.component';

describe('PriorityProjectListComponent', () => {
  let component: PriorityProjectListComponent;
  let fixture: ComponentFixture<PriorityProjectListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityProjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
